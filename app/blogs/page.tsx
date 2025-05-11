"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Create a loading placeholder
const EditorLoading = () => (
  <div className="min-h-screen bg-gray-50 text-black py-6 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4 min-h-[500px]">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4 min-h-[500px]">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dynamically import the editor component with SSR disabled
const RichTextEditor = dynamic(
  () => import('../component/RichTextEditor'),
  { 
    ssr: false,
    loading: () => <EditorLoading />
  }
);

export default function BlogsPage() {
  return (
    <Suspense fallback={<EditorLoading />}>
      <RichTextEditor  />
    </Suspense>
  );
}