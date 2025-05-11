import { OutputData } from "@editorjs/editorjs";

interface JsonViewProps {
  title: string;
  content: OutputData | null;
}

const JsonView = ({ title, content }: JsonViewProps) => {
  return (
    <div className="font-mono text-sm overflow-auto">
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify({ title, content }, null, 2)}
      </pre>
    </div>
  );
};

export default JsonView;