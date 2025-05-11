import React from 'react';
import edjsParser from 'editorjs-parser';
import Image from 'next/image';

const Preview = ({ isOpen, onClose, passedhtml }) => {
  if (!isOpen) return null;
  
  const { title, content } = passedhtml || {};

  // Error state if no content
  if (!content || !content.blocks || !Array.isArray(content.blocks)) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <p className="text-gray-700">No content available to preview.</p>
        </div>
      </div>
    );
  }

  // Configure parsers for EditorJS blocks
  const customParsers = {
    header: (data) => {
      const level = data.level;
      const tag = `h${level}`;
      let className = '';
      
      switch(level) {
        case 1: className = 'text-3xl font-bold text-gray-900 mb-4'; break;
        case 2: className = 'text-2xl font-bold mt-8 mb-4 text-gray-900'; break;
        case 3: className = 'text-xl font-bold mt-6 mb-3 text-gray-900'; break;
        case 4: className = 'text-lg font-bold mt-4 mb-2 text-gray-900'; break;
        case 5: className = 'text-base font-bold mt-3 mb-1 text-gray-900'; break;
        case 6: className = 'text-sm font-bold mt-3 mb-1 text-gray-900'; break;
      }
      
      return `<${tag} class="${className}">${data.text}</${tag}>`;
    },
    paragraph: (data) => `<p class="mb-4 text-gray-700">${data.text}</p>`,
    image: (data) => `
      <figure class="my-6">
        <img src="${data.file?.url}" alt="${data.caption || ''}" class="rounded-lg mx-auto max-w-full shadow-md" />
        ${data.caption ? `<figcaption class="text-center text-sm text-gray-600 mt-2">${data.caption}</figcaption>` : ''}
      </figure>`,
    quote: (data) => `
      <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
        <p>${data.text}</p>
        ${data.caption ? `<cite class="block text-sm mt-2">— ${data.caption}</cite>` : ''}
      </blockquote>`,
    warning: (data) => `
      <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-4 rounded-md">
        <strong class="block">${data.title}</strong>
        <span>${data.message}</span>
      </div>`,
    checklist: (data) => `
      <div class="my-4 space-y-2">
        ${data.items.map(item => `
          <label class="flex items-center space-x-2 text-gray-700">
            <input type="checkbox" ${item.checked ? 'checked' : ''} disabled class="accent-gray-600" />
            <span>${item.text}</span>
          </label>`).join('')}
      </div>`,
      list: (data) => {
        const tag = data.style === 'ordered' ? 'ol' : 'ul';
        const listClass = 'my-4 pl-5 space-y-2 text-gray-700';
        const itemClass = 'mb-1';
        
        return `<${tag} class="${listClass}">
          ${data.items.map(item => {
            const content = typeof item === 'string' 
              ? item 
              : (item.content || JSON.stringify(item));
            return `<li class="${itemClass}">${content}</li>`;
          }).join('')}
        </${tag}>`;
      },
    alert: (data) => {
      const alertClasses = {
        primary: 'bg-blue-100 text-blue-800 border-blue-500',
        secondary: 'bg-gray-100 text-gray-800 border-gray-500',
        info: 'bg-cyan-100 text-cyan-800 border-cyan-500',
        success: 'bg-green-100 text-green-800 border-green-500',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
        danger: 'bg-red-100 text-red-800 border-red-500',
      };
      return `
        <div class="border-l-4 p-4 my-4 rounded-md ${alertClasses[data.type] || alertClasses.primary}">
          ${data.message}
        </div>`;
    },
    table: (data) => `
      <div class="overflow-x-auto my-4">
        <table class="min-w-full border border-gray-300 text-sm">
          <tbody>
            ${data.content.map(row => `
              <tr>
                ${row.map(cell => `<td class="border px-4 py-2 text-gray-700">${cell}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`,
    embed: (data) => `
      <div class="my-6">
        <iframe src="${data.embed}" height="315" class="w-full rounded-md shadow" frameborder="0" allowfullscreen></iframe>
        ${data.caption ? `<p class="text-center text-sm text-gray-500 mt-1">${data.caption}</p>` : ''}
      </div>`,
    delimiter: () => `<hr class="my-6 border-t-2 border-gray-200" />`
  };

  const parser = new edjsParser({ customParsers });
  const htmlContent = parser.parse(content);

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate approximate read time (1 min per 200 words)
  const calculateReadTime = () => {
    let wordCount = 0;
    content.blocks.forEach(block => {
      if (['paragraph', 'header', 'list'].includes(block.type)) {
        const text = block.data.text || 
                    (block.data.items ? block.data.items.join(' ') : '');
        if (text) {
          wordCount += text.split(/\s+/).length;
        }
      }
    });
    return Math.max(1, Math.ceil(wordCount / 200));
  };
  
  const readTime = calculateReadTime();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative min-h-[90vh] max-h-[90vh] overflow-y-auto w-full max-w-3xl">
        {/* Close button for modal */}
        <button 
          onClick={onClose}
          className="fixed top-4 right-4 bg-white rounded-full p-2 text-gray-800 hover:text-black shadow-lg z-10"
          aria-label="Close preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Blog post container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Featured image - use the first image found in blocks, or a placeholder */}
          <div className="relative h-80 w-full">
            {content.blocks.find(b => b.type === 'image')?.data?.file?.url ? (
              <img
                src={content.blocks.find(b => b.type === 'image')?.data?.file?.url}
                alt="Featured"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-8">
            {/* Meta info */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-3">{currentDate}</span>
              <span className="mr-3">•</span>
              <span>{readTime} min read</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            
            {/* Author - placeholder since we don't have author info */}
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Author</p>
                <p className="text-sm text-gray-500">Content Creator</p>
              </div>
            </div>
            
            {/* Blog content */}
            <div 
              className="prose text-black max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
            
            {/* Tags - extract keywords if available */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Blog</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Article</span>
                {title.split(' ').filter(word => word.length > 4).slice(0, 2).map((word, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {word.replace(/[^\w\s]/gi, '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;