import { OutputData } from "@editorjs/editorjs";

export const renderPreview = (title: string, editorData: OutputData | null) => {
  // First check if editorData exists
  if (!editorData) {
    return <div className="text-gray-400">Your preview will appear here...</div>;
  }
  
  // Add this additional check for the blocks property
  if (!editorData.blocks || !Array.isArray(editorData.blocks)) {
    return <div className="text-gray-400">Editor content is being prepared...</div>;
  }

  return (
    <div className="prose max-w-none">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {editorData.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            const level = block.data.level;
            // Use specific styling for each heading level
            if (level === 1) return <h1 key={index} className="text-3xl font-bold mt-6 mb-4" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            if (level === 2) return <h2 key={index} className="text-2xl font-bold mt-5 mb-3" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            if (level === 3) return <h3 key={index} className="text-xl font-bold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            if (level === 4) return <h4 key={index} className="text-lg font-bold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            if (level === 5) return <h5 key={index} className="text-base font-bold mt-3 mb-1" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            return <h6 key={index} className="text-sm font-bold mt-3 mb-1" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
          
          
          case 'paragraph':
            return <p key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            case 'list':
              const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={index}>
                  {block.data.items.map((item: any, i: number) => (
                    <li key={i} dangerouslySetInnerHTML={{ 
                      __html: typeof item === 'string' 
                        ? item 
                        : (item.content || JSON.stringify(item))
                    }} />
                  ))}
                </ListTag>
              );
          
          case 'image':
            return (
              <figure key={index} className="my-4">
                <img 
                  src={block.data.file?.url} 
                  alt={block.data.caption || 'Image'} 
                  className="rounded-lg max-w-full"
                />
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );
          
          case 'table':
            return (
              <div key={index} className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody>
                    {block.data.content.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 border">
                            <div dangerouslySetInnerHTML={{ __html: cell }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          
          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-gray-300 pl-4 py-2 my-4">
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && (
                  <cite className="block text-sm mt-2">— {block.data.caption}</cite>
                )}
              </blockquote>
            );
          
          case 'code':
            return (
              <pre key={index} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                <code>{block.data.code}</code>
              </pre>
            );
          
          case 'delimiter':
            return <hr key={index} className="my-6 border-t-2 border-gray-200" />;
          
          case 'warning':
            return (
              <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="font-bold">{block.data.title}</div>
                <div dangerouslySetInnerHTML={{ __html: block.data.message }} />
              </div>
            );
          
          case 'checklist':
            return (
              <div key={index} className="my-4">
                {block.data.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      checked={item.checked} 
                      readOnly 
                      className="mr-2 h-4 w-4"
                    />
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                ))}
              </div>
            );
          
          case 'embed':
            return (
              <div key={index} className="my-4 aspect-video">
                <iframe
                  src={block.data.embed}
                  className="w-full h-full rounded"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {block.data.caption && (
                  <p className="text-center text-sm text-gray-500 mt-2">{block.data.caption}</p>
                )}
              </div>
            );
          
          case 'linkTool':
            return (
              <a 
                key={index}
                href={block.data.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block border rounded-lg p-4 my-4 no-underline hover:bg-gray-50"
              >
                {block.data.meta?.image?.url && (
                  <img 
                    src={block.data.meta.image.url} 
                    className="w-full h-40 object-cover rounded mb-3"
                    alt={block.data.meta.title || "Link preview"}
                  />
                )}
                <h3 className="text-lg font-semibold">{block.data.meta?.title || block.data.link}</h3>
                {block.data.meta?.description && (
                  <p className="text-gray-600 mt-2">{block.data.meta.description}</p>
                )}
                <div className="text-blue-500 text-sm mt-2">{block.data.link}</div>
              </a>
            );
          
          case 'alert':
            const alertClasses = {
              primary: 'bg-blue-50 border-blue-400 text-blue-800',
              secondary: 'bg-gray-50 border-gray-400 text-gray-800',
              info: 'bg-cyan-50 border-cyan-400 text-cyan-800',
              success: 'bg-green-50 border-green-400 text-green-800',
              warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
              danger: 'bg-red-50 border-red-400 text-red-800',
              light: 'bg-gray-50 border-gray-200 text-gray-600',
              dark: 'bg-gray-700 border-gray-800 text-white',
            };
            const alertClass = alertClasses[block.data.type as keyof typeof alertClasses] || alertClasses.primary;
            
            return (
              <div key={index} className={`border-l-4 p-4 my-4 ${alertClass}`}>
                <div dangerouslySetInnerHTML={{ __html: block.data.message }} />
              </div>
            );
            
          case 'inlineCode':
            return (
              <code key={index} className="px-1 py-0.5 bg-gray-100 rounded">
                {block.data.text}
              </code>
            );
            
          case 'marker':
            return (
              <mark key={index} className="bg-yellow-200 px-1">
                {block.data.text}
              </mark>
            );
            
          default:
            // For any unknown block types or debugging
            return (
              <div key={index} className="border border-dashed border-gray-300 p-4 my-4 rounded">
                <div className="text-xs text-gray-500 mb-2">
                  Unknown block type: {block.type}
                </div>
                <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded">
                  {JSON.stringify(block.data, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </div>
  );
};