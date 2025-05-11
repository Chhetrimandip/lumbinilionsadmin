"use client"
import React from 'react'
import { useState, useRef } from 'react';
import Preview from './preview';
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { editorTools } from '../component/editorTools';

const testbutton = () => {
    const editorRef = useRef<EditorJS | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorData, setEditorData] = useState<OutputData | null>(null);


    const [isPreviewOpen,setPreview] = useState(false);
    const openPreview = () => setPreview(true) 
    const closePreview = () => setPreview(false)
    // We'll keep this state for future use
    const [editorReady, _setEditorReady] = useState(false);
    const initEditor = async () => {
        if (editorRef.current) {
          await editorRef.current.isReady;
          editorRef.current.destroy();
          editorRef.current = null;
        }
  
        if (!containerRef.current) return;
        
        try {
          const editor = new EditorJS({
            holder: containerRef.current,
            tools: editorTools as any, // Type assertion to bypass type checking
            placeholder: "Start writing your blog...",
            onReady: () => {
              console.log("Editor.js is ready!");
              _setEditorReady(true);
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
      // Use React's useEffect hook to initialize the editor
      React.useEffect(() => {
        initEditor();
        
        // Cleanup function to destroy editor when component unmounts
        return () => {
          if (editorRef.current) {
            editorRef.current.destroy();
            editorRef.current = null;
          }
        };
      }, []);
      };
  
      initEditor();


    return ( 
<div className="flex items-center text-black text-bold justify-center h-screen"> 
            <button onClick={openPreview} className='bg-white'>
                Press this to use something interactive
            </button>

            <Preview isopen = {isPreviewOpen} onclose={closePreview} >
                <div ref={containerRef}/>
            </Preview>
        </div>
     );
}
}
 
export default testbutton