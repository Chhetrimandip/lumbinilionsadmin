"use client";

import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { editorTools } from "../editortools";

interface EditorComponentProps {
  containerRef: React.RefObject<HTMLDivElement>;
  editorRef: React.RefObject<EditorJS | null>;
  onReady: () => void;
  onDataChange: (data: any) => void;
}

export const EditorComponent = ({ 
  containerRef, 
  editorRef, 
  onReady, 
  onDataChange 
}: EditorComponentProps) => {
  
  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const initEditor = async () => {
      if (editorRef.current) {
        await editorRef.current.isReady;
        editorRef.current.destroy();
        editorRef.current = null;
      }

      try {
        const editor = new EditorJS({
          holder: containerRef.current,
          tools: editorTools,
          placeholder: "Start writing your blog...",
          onReady: () => {
            console.log("Editor.js is ready!");
            onReady();
          },
          onChange: async (api) => {
            try {
              const data = await api.saver.save();
              onDataChange(data);
            } catch (err) {
              console.error('Failed to save editor data', err);
            }
          }
        });

        editorRef.current = editor;
      } catch (error) {
        console.error('Editor initialization failed:', error);
      }
    };

    initEditor();

    return () => {
      const cleanupEditor = async () => {
        if (editorRef.current && editorRef.current.destroy) {
          try {
            await editorRef.current.isReady;
            editorRef.current.destroy();
            editorRef.current = null;
          } catch (e) {
            console.error('Failed to destroy editor', e);
          }
        }
      };
      
      cleanupEditor();
    };
  }, [containerRef, editorRef, onReady, onDataChange]);

  return null; // This component doesn't render anything
};