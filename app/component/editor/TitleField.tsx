interface TitleFieldProps {
    title: string;
    setTitle: (title: string) => void;
  }
  
  export const TitleField = ({ title, setTitle }: TitleFieldProps) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
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
    );
  };