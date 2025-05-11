"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { editorTools } from "./editorTools";
import { renderPreview } from "./preview/PreviewRenderer";
import JsonView from "./preview/JsonView";
import Preview from "./preview";
import Link from "next/link";

// Remove this import if you're not using it
// import { CldUploadButton } from "next-cloudinary";

const RichTextEditor = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [title, setTitle] = useState<string>('');
  const [editorReady, setEditorReady] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [isPreviewerOpen, setIsPreviewerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  const openPreview = () => setIsPreviewerOpen(true);
  const closeModal = () => setIsPreviewerOpen(false);

  // Initialize Cloudinary widget
  useEffect(() => {
    // Only load if window.cloudinary is not available yet
    if (typeof window !== 'undefined' && !window.cloudinary) {
      // Add Cloudinary script
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // Initialize Cloudinary widget when script loads
  useEffect(() => {
    if (typeof window !== 'undefined' && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: 'ml_default', // My upload preset
          multiple: false,
          folder: 'blog_images', // Optional folder name in your Cloudinary account
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Image uploaded successfully:', result.info);
            // You can do something with the result if needed
          }
        }
      );
      setCloudinaryWidget(widget);
    }
  }, []);

  // Function to open the widget
  const openCloudinaryWidget = () => {
    if (cloudinaryWidget) {
      cloudinaryWidget.open();
    }
  };

  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const initEditor = async () => {
      if (editorRef.current) {
        await editorRef.current.isReady;
        editorRef.current.destroy();
        editorRef.current = null;
      }

      try {
        const editor = new EditorJS({
          holder: containerRef.current,
          tools: editorTools,
          placeholder: "Start writing your blog...",
          onReady: () => {
            console.log("Editor.js is ready!");
            setEditorReady(true);
          },
          onChange: async (api) => {
            try {
              const data = await api.saver.save();
              setEditorData(data);
            } catch (err) {
              console.error('Failed to save editor data', err);
            }
          }
        });

        editorRef.current = editor;
      } catch (error) {
        console.error('Editor initialization failed:', error);
      }
    };

    initEditor();

    return () => {
      const cleanupEditor = async () => {
        if (editorRef.current && editorRef.current.destroy) {
          try {
            await editorRef.current.isReady;
            editorRef.current.destroy();
            editorRef.current = null;
          } catch (e) {
            console.error('Failed to destroy editor', e);
          }
        }
      };
      
      cleanupEditor();
    };
  }, []);

  const handleSave = async () => {
    if (editorRef.current) {
      try {
        setIsSaving(true);
        const output = await editorRef.current.save();
        const modifiedOutput = { ...output };
        let hasImagesToUpload = false;
        
        for (let i = 0; i < modifiedOutput.blocks.length; i++) {
          const block = modifiedOutput.blocks[i];
          if (block.type === 'image' && 
              block.data.file && 
              block.data.file.isTemp && 
              block.data.file.originalFile) {
            
            hasImagesToUpload = true;
            
            try {
              console.log(`Uploading image ${i+1}`);
              
              // Use a signed upload to avoid CORS issues
              // Approach 1: Use your backend as a proxy for the upload
              const formData = new FormData();
              formData.append('file', block.data.file.originalFile);
              
              const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData
              });
              
              if (!uploadResponse.ok) {
                throw new Error('Failed to upload image through backend');
              }
              
              const data = await uploadResponse.json();
              
              if (data.secure_url) {
                // Replace temp URL with Cloudinary URL
                modifiedOutput.blocks[i].data.file.url = data.secure_url;
                
                // Remove temp markers
                delete modifiedOutput.blocks[i].data.file.isTemp;
                delete modifiedOutput.blocks[i].data.file.originalFile;
              }
            } catch (uploadError) {
              console.error('Error uploading image:', uploadError);
            }
          }
        }
        
        // Create the blog data with the modified/maybe modified content
        // Extract the first image URL to use as the blog's thumbnail
        const firstImageBlock = modifiedOutput.blocks.find(block => 
          block.type === 'image' && block.data.file && block.data.file.url
        );
        
        // Update the blogData object to include the imageUrl
        const blogData = {
          title,
          content: modifiedOutput, // This should match what your API expects
          imageUrl: firstImageBlock ? firstImageBlock.data.file.url : null
        };

        // Send to API
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(blogData)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save blog post: ${response.status} ${response.statusText}`);
        }
        
        // Show success message
        alert('Blog post saved successfully! It will appear in your blog list.');  
      
        //  Update editor with the Cloudinary URLs if any images were uploaded
        if (hasImagesToUpload) {
          // Update editor content with Cloudinary URLs
          editorRef.current.render(modifiedOutput);
        }    
      } catch (error) {
        console.error('Error saving blog post:', error);
        alert(`Failed to save content: ${error.message}`);
      } finally {
        setIsSaving(false);
      }
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-full mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <Link className="container bg-black rounded p-1" href="/">Home</Link>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title..."
          />
        </div>
        <button 
          onClick={openCloudinaryWidget}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4"
        >
          Upload Image //remove this button

        </button> 

        <div className="flex flex-col md:flex-row gap-4">
          {/* Editor Panel */}
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full">
              <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Editor</h3>
                <div className={`w-2 h-2 rounded-full ${editorReady ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              </div>
              <div 
                ref={containerRef} 
                className="p-4 text-black bg-white min-h-[600px]" 
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full">
              <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Preview</h3>
                
                {/* Toggle for JSON view */}
                <div className="flex items-center">
                  <span className="mr-2 text-xs text-gray-500">JSON View</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={showJson}
                      onChange={() => setShowJson(!showJson)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="p-4 min-h-[600px] overflow-auto">
                {showJson ? (
                  <JsonView title={title} content={editorData} />
                ) : (
                  <div className="prose max-w-none text-black">
                    {renderPreview(title, editorData)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
          <div className="text-sm text-gray-500">
            {showJson 
              ? "Showing raw JSON data structure. Toggle to see formatted preview." 
              : "Showing formatted preview. Toggle for JSON view."}
          </div>
          <div className="flex space-x-4">
                <button 
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!editorReady || isSaving}
                >
                {isSaving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
                ) : (
                'Save Blog Post'
                )}
                </button>
            
            <button 
              onClick={openPreview}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Full Screen Preview
            </button>
          </div>
          
          <Preview 
            isOpen={isPreviewerOpen} 
            onClose={closeModal} 
            passedhtml={{ title, content: editorData }} 
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;