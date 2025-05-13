"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  parentCategory?: string | null;
}

interface CategoryNode {
  name: string;
  path: string; // Full path like "2024/vsJanakpur"
  isFolder: boolean;
}

export const GalleryView = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // For image upload
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // For editing
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("All");
  const [editParentCategory, setEditParentCategory] = useState<string | null>(null);
  
  // For nested category navigation
  const [currentPath, setCurrentPath] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["All"]);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [currentLevel, setCurrentLevel] = useState<"root" | "parent" | "child">("root");
  const [currentParent, setCurrentParent] = useState<string | null>(null);
  
  // Calculate items to display based on current path
// Calculate items to display based on current path
// Calculate items to display based on current path
const currentItems = images.filter(image => {
  // Ignore folder marker images
  if (image.title?.startsWith("Folder:")) {
    return false;
  }
  
  if (currentPath === "All") {
    // At root, only show images with no category or parent
    return !image.category && !image.parentCategory;
  } else if (currentLevel === "parent") {
    // In a parent folder, show images with this folder as category
    return image.category === currentPath && !image.parentCategory;
  } else if (currentLevel === "child") {
    // In a child folder, show images with this folder as category and the parent folder as parentCategory
    return image.category === currentPath && image.parentCategory === currentParent;
  }
  
  return false;
});
  
  // Calculate folders (categories that have this path as parent)
  const folders = getSubcategories(currentPath);
  
  // Function to get subcategories for the current path
// Function to get subcategories for the current path
// Function to get subcategories for the current path
function getSubcategories(path: string): CategoryNode[] {
  const uniqueFolders = new Set<string>();
  
  if (path === "All") {
    // At root, show PARENT folders (those with non-null parentCategory and null category)
    images.forEach(img => {
      if (img.parentCategory && !img.category) {
        uniqueFolders.add(img.parentCategory);
      }
    });
  } else {
    // Inside a parent folder, show CHILD folders (those with this folder as parentCategory and non-null category)
    images.forEach(img => {
      if (img.parentCategory === path && img.category) {
        uniqueFolders.add(img.category);
      }
    });
  }
  
  return Array.from(uniqueFolders).map(name => ({
    name,
    path: name,
    isFolder: true
  }));
}
  // Fetch images when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Extract unique categories and build hierarchy when images change
  useEffect(() => {
    const allCategories = new Set(["All"]);
    const parentChildMap = new Map<string, Set<string>>();
    
    // First pass: collect all categories
    images.forEach(img => {
      if (img.category) allCategories.add(img.category);
      
      // Track parent-child relationships
      const parent = img.parentCategory || "All";
      if (!parentChildMap.has(parent)) {
        parentChildMap.set(parent, new Set());
      }
      if (img.category) {
        parentChildMap.get(parent)?.add(img.category);
      }
    });
    
    setCategories(Array.from(allCategories));
    
    // Update breadcrumbs based on current path
    if (currentPath === "All") {
      setBreadcrumbs(["All"]);
    } else if (currentLevel === "child" && currentParent) {
      // For child folders, ensure we have parent in breadcrumbs
      setBreadcrumbs(["All", currentParent, currentPath]);
    } else {
      // For parent folders
      setBreadcrumbs(["All", currentPath]);
    }
  }, [images, currentPath, currentLevel, currentParent]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/gallery');
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      console.log("API returned images:", data);
      setImages(data);

      // Add this to check what's being filtered
      console.log("Current path:", currentPath);
      console.log("Filtered items:", currentItems);
      console.log("Folders found:", folders);

      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Show progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return 90; // Max 90% until we get actual response
          return prev + 10;
        });
      }, 500);
      
      // Upload to Cloudinary via our API
      const uploadResponse = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }
      
      const uploadResult = await uploadResponse.json();
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Extract current category and parent from path
      const categoryParts = currentPath.split('/');
      const category = categoryParts.pop() || 'All';
      const parentCategory = category === 'All' ? null : categoryParts.join('/') || null;
      
      // Create new gallery item with the Cloudinary URL
        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   title: file.name.split('.')[0], // Use filename as default title
          //   imageUrl: uploadResult.secure_url, // Cloudinary secure URL
          //   category: currentPath === "All" ? null : currentPath, // Current category
            
          //   // If we're at root, parentCategory is null
          //   // If we're in a folder, use that folder name as the category
          //   // and the parent folder (if any) as parentCategory
          // parentCategory: currentPath === "All" ? null : 
          //   breadcrumbs.length > 2 ? breadcrumbs[1] : null
          // }),
          body: JSON.stringify({
            title: file.name.split('.')[0],
            imageUrl: uploadResult.secure_url,
            category: currentPath,
            parentCategory: currentLevel === "child" ? currentParent : null
          }),
        });
      
      if (!response.ok) {
        throw new Error('Failed to add image to gallery');
      }
      
      const newImage = await response.json();
      setImages(prevImages => [...prevImages, newImage]);
      setSuccess('Image uploaded successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };
const handleCreateNewCategory = async () => {
  if (!newCategoryName.trim()) {
    setError('Category name cannot be empty');
    return;
  }
  
  try {
    setLoading(true);
    
    // Create a folder marker
    const response = await fetch('/api/gallery/folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        currentPath === "All"
          ? {
              // Creating a PARENT folder (level 1)
              parentCategory: newCategoryName.trim(),
              category: null
            }
          : {
              // Creating a CHILD folder (level 2)
              parentCategory: currentPath,
              category: newCategoryName.trim()
            }
      ),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create folder');
    }
    
    // Refresh the gallery to get updated folders
    await fetchImages();
    
    setSuccess('Folder created successfully');
    setShowNewCategoryModal(false);
    setNewCategoryName('');
    
    // Add debugging
    console.log('Created new folder:', 
      currentPath === "All"
        ? { parentCategory: newCategoryName.trim(), category: null }
        : { parentCategory: currentPath, category: newCategoryName.trim() }
    );
    
  } catch (err) {
    console.error('Error creating folder:', err);
    setError('Failed to create folder');
  } finally {
    setLoading(false);
  }};


const navigateTo = (path: string) => {
  console.log("Navigation request:", { 
    path, 
    currentPath, 
    currentLevel, 
    currentParent, 
    breadcrumbs 
  });
  
  if (path === "All") {
    // Going to root
    setCurrentPath("All");
    setBreadcrumbs(["All"]);
    setCurrentLevel("root");
    setCurrentParent(null);
    return;
  }
  
  // Check if we're at root and clicking a parent folder
  if (currentPath === "All") {
    // Going to a parent folder from root
    setCurrentPath(path);
    setBreadcrumbs(["All", path]);
    setCurrentLevel("parent");
    setCurrentParent(null);
    return;
  }
  
  // We're inside a parent folder and clicking a child folder
  if (currentLevel === "parent") {
    // If we're in a parent folder, the child's full path needs parent info
    setCurrentPath(path);
    setBreadcrumbs(["All", currentPath, path]);
    setCurrentLevel("child");
    setCurrentParent(currentPath);
    return;
  }
  
  // We're likely clicking in breadcrumbs to navigate back
  setCurrentPath(path);
  
  // Rebuild breadcrumbs based on the path
  if (path === "All") {
    setBreadcrumbs(["All"]);
    setCurrentLevel("root");
    setCurrentParent(null);
  } else {
    const isParent = images.some(img => img.parentCategory === path && !img.category);
    if (isParent) {
      setBreadcrumbs(["All", path]);
      setCurrentLevel("parent");
      setCurrentParent(null);
    } else {
      // This is a child folder, find its parent
      const parentFolder = images.find(img => 
        img.category === path && img.parentCategory
      )?.parentCategory;
      
      if (parentFolder) {
        setBreadcrumbs(["All", parentFolder, path]);
        setCurrentLevel("child");
        setCurrentParent(parentFolder);
      } else {
        // Fallback if we can't determine the hierarchy
        setBreadcrumbs(["All", path]);
        setCurrentLevel("parent");
        setCurrentParent(null);
      }
    }
  }
};

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
      
      setImages(prevImages => prevImages.filter(img => img.id !== id));
      setSuccess('Image deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setEditTitle(image.title || "");
    setEditCategory(image.category || "All");
    setEditParentCategory(image.parentCategory || null);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          imageUrl: editingImage.imageUrl,
          category: editCategory,
          parentCategory: editParentCategory
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update image');
      }
      
      const updatedImage = await response.json();
      setImages(prevImages => 
        prevImages.map(img => img.id === updatedImage.id ? updatedImage : img)
      );
      
      setSuccess('Image updated successfully');
      setShowEditModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating image:', err);
      setError('Failed to update image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header with navigation */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-1 text-gray-400">/</span>}
              <button 
                onClick={() => navigateTo(index === 0 ? "All" : crumb)}
                className={`hover:text-blue-600 ${
                  index === breadcrumbs.length - 1 
                    ? 'font-semibold text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                {index === 0 ? "Home" : crumb.split('/').pop()}
              </button>
            </div>
          ))}
        </div>
        
        {/* Title and actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl">
            {currentPath === "All" ? "Gallery" : `Gallery: ${currentPath.split('/').pop()}`}
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Create new folder button */}
            <button 
              onClick={() => setShowNewCategoryModal(true)}
              className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Folder
            </button>
            
            {/* Upload image button */}
            <label className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center cursor-pointer">
              {uploading ? `Uploading ${uploadProgress}%` : 'Upload Image'}
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {loading && !uploading && <div>Loading...</div>}

      {/* Folders and images */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Folders first */}
        {folders.map((folder) => (
          <div 
            key={`folder-${folder.path}`} 
            className="relative cursor-pointer bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-400 transition-colors"
            onClick={() => navigateTo(folder.path)}
          >
            <div className="flex flex-col items-center justify-center py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <p className="mt-2 text-sm font-medium">{folder.name}</p>
            </div>
          </div>
        ))}

        {/* Images */}
        {currentItems.map((image) => (
          <div key={image.id} className="relative group">
            <div className="relative h-48 w-full">
              <Image
                src={image.imageUrl} 
                alt={`Gallery image: ${image.title}`} 
                fill
                className="object-cover rounded-lg"
                loading="lazy" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw)"
              />
              <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                {image.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
              <p className="text-white font-medium mb-2">{image.title}</p>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => openEditModal(image)}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Create New Folder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Folder Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter folder name"
                  required
                />
              </div>
              
              <div className="text-sm text-gray-500">
                This folder will be created in: <span className="font-semibold">{currentPath === "All" ? "Root" : currentPath}</span>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewCategory}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={loading || !newCategoryName.trim()}
                >
                  {loading ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Image</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex flex-col space-y-2">
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  <div className="text-sm text-gray-500">
                    Current path: <span className="font-medium">{editParentCategory ? `${editParentCategory}/${editCategory}` : editCategory}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};