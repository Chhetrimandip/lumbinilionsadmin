// @ts-nocheck
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image"; 
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import InlineCode from "@editorjs/inline-code";
import Alert from "editorjs-alert";

export const editorTools = {
  // Text formatting
  header: Header,
  paragraph: Paragraph,
  list: List,
  quote: Quote,
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+C',
  },
  code: Code,
  
  // Media and visuals
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          // Generate a temporary local URL for preview
          const tempUrl = URL.createObjectURL(file);
          
          // Add a marker to indicate this is a temporary image
          return Promise.resolve({
            success: 1,
            file: {
              url: tempUrl,
              // Store additional metadata to identify this as a temp image
              isTemp: true,
              originalFile: file  // Store the original file for later upload
            },
          });
        },
      },
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        instagram: true,
        twitter: true,
      },
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  
  // Interactive elements
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: '/api/fetchUrl',
    },
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+A',
    config: {
      defaultType: 'primary',
      types: {
        primary: 'Primary',
        secondary: 'Secondary',
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        danger: 'Danger',
        light: 'Light',
        dark: 'Dark'
      }
    }
  },
};