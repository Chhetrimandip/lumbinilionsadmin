import Image from "next/image";
export const GalleryView = () => {
  // Hardcoded gallery data
  const images = [
    { 
      id: '1', 
      url: 'https://placehold.co/600x400/png', 
      title: 'Team Photo 2025', 
      uploadedAt: '2025-04-15T10:30:00Z'
    },
    { 
      id: '2', 
      url: 'https://placehold.co/600x400/png', 
      title: 'Championship Celebration', 
      uploadedAt: '2025-04-14T14:20:00Z'
    },
    { 
      id: '3', 
      url: 'https://placehold.co/600x400/png', 
      title: 'Training Session', 
      uploadedAt: '2025-04-13T09:15:00Z'
    },
    { 
      id: '4', 
      url: 'https://placehold.co/600x400/png', 
      title: 'Fan Meet and Greet', 
      uploadedAt: '2025-04-12T11:45:00Z'
    },
    { 
      id: '5', 
      url: 'https://placehold.co/600x400/png', 
      title: 'New Kit Reveal', 
      uploadedAt: '2025-04-11T16:30:00Z'
    },
    { 
      id: '6', 
      url: 'https://placehold.co/600x400/png', 
      title: 'Stadium Aerial View', 
      uploadedAt: '2025-04-10T13:10:00Z'
    }
  ];

  const handleDelete = (id) => {
    console.log(`Delete image with ID: ${id}`);
    alert(`Image with ID: ${id} would be deleted in a real app`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Gallery</h2>
        <label className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center cursor-pointer">
          Upload Image
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <Image
              src={image.url} 
              alt={image.title} 
              width={10}
              height={10}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <p className="text-white font-medium mb-2">{image.title}</p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
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
    </div>
  );
};