"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Import RichTextEditor with dynamic loading
const RichTextEditor = dynamic(
  () => import("@/app/component/RichTextEditor"),
  { ssr: false }
);

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBlog();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push('/admin')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return blog ? (
    <RichTextEditor 
      isEditing={true} 
      blogToEdit={blog} 
    />
  ) : null;
}