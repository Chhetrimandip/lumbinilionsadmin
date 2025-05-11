import { useState } from "react";
import { format } from 'date-fns';

export const BlogsView = ({ blogs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  console.log("Blogs in blogsview",blogs)
  // Early return with loading state if blogs is undefined
  if (!blogs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  const filteredPosts = blogs.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof post.content === 'string' 
      ? post.content.toLowerCase().includes(searchTerm.toLowerCase())
      : JSON.stringify(post.content).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete blog');
        }
        
        alert('Blog post deleted successfully!');
        // Refresh the page or update state to reflect deletion
        window.location.reload();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog post');
      }
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/blogs/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ published: !currentStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update publication status');
      }
      
      alert(`Publication status changed successfully!`);
      // Refresh the page or update state to reflect the change
      window.location.reload();
    } catch (error) {
      console.error('Error updating publication status:', error);
      alert('Failed to update publication status');
    }
  };

  // Handle content display properly
  const formatContent = (content) => {
    if (typeof content === 'string') {
      try {
        // Try to parse if it's a JSON string
        const parsed = JSON.parse(content);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
          // Extract text from the first few blocks
          return parsed.blocks
            .slice(0, 2)
            .map(block => block.data.text || '')
            .join(' ')
            .substring(0, 100) + '...';
        }
        return content.substring(0, 100) + '...';
      } catch (e) {
        // If not valid JSON, just use the string
        return content.substring(0, 100) + '...';
      }
    } else if (content && content.blocks) {
      // If it's already an object with blocks
      return content.blocks
        .slice(0, 2)
        .map(block => block.data.text || '')
        .join(' ')
        .substring(0, 100) + '...';
    }
    return 'No content available';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="w-80 bg-neutral-500/25 rounded-2xl p-2">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full bg-transparent outline-none text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <a href="/admin/blogs/new">
          <button className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center hover:bg-neutral-600/25">
            NEW
          </button>
        </a>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No blogs match your search criteria' : 'No blogs found. Create your first blog post!'}
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="pb-4 text-xl font-normal">Date</th>
              <th className="pb-4 text-xl font-normal">Title</th>
              <th className="pb-4 text-xl font-normal">Content</th>
              <th className="pb-4 text-xl font-normal">Status</th>
              <th className="pb-4 text-xl font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="border-t border-gray-100">
                <td className="py-4 text-base">
                  {post.createdat ? format(new Date(post.createdat), 'MM/dd/yy') : 'N/A'}
                </td>
                <td className="py-4 text-base font-medium">{post.title}</td>
                <td className="py-4 text-base">{formatContent(post.content)}</td>
                <td className="py-4 text-base">
                  <span 
                    className={`px-2 py-1 rounded cursor-pointer ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    onClick={() => togglePublish(post.id, post.published)}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <a href={`/admin/blogs/edit/${post.id}`}>
                      <button className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center hover:bg-neutral-600/25">
                        Edit
                      </button>
                    </a>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-100 text-red-800 rounded-2xl p-2 w-20 text-center hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};