import { OutputData } from "@editorjs/editorjs";
import Preview from "../preview";

interface ActionBarProps {
  title: string;
  editorData: OutputData | null;
  editorReady: boolean;
  showJson: boolean;
  isPreviewerOpen: boolean;
  closeModal: () => void;
  openPreview: () => void;
  handleSave: () => void;
}

export const ActionBar = ({ 
  title, 
  editorData, 
  editorReady, 
  showJson, 
  isPreviewerOpen, 
  closeModal, 
  openPreview, 
  handleSave 
}: ActionBarProps) => {
  return (
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
          disabled={!editorReady}
        >
          Save Blog Post
        </button>
        
        <button 
          onClick={openPreview}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          disabled={!editorReady || !editorData}
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
  );
};