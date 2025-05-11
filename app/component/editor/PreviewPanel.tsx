import { OutputData } from "@editorjs/editorjs";
import { renderPreview } from "../preview/PreviewRenderer";
import JsonView from "../preview/JsonView";

interface PreviewPanelProps {
  title: string;
  editorData: OutputData | null;
  showJson: boolean;
  setShowJson: (show: boolean) => void;
}

export const PreviewPanel = ({ 
  title, 
  editorData, 
  showJson, 
  setShowJson 
}: PreviewPanelProps) => {
  return (
    <div className="w-full md:w-1/2">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Preview</h3>
          
          {/* Toggle for JSON view */}
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-500">JSON View</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showJson}
                onChange={() => setShowJson(!showJson)}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="p-4 min-h-[600px] overflow-auto">
          {showJson ? (
            <JsonView title={title} content={editorData} />
          ) : (
            <div className="prose max-w-none text-black">
              {renderPreview(title, editorData)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};