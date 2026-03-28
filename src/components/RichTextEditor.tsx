"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-40 bg-slate-50 border border-slate-200 rounded animate-pulse"></div> 
});

interface RichTextEditorProps {
  name: string;
  initialValue?: string;
  placeholder?: string;
}

export default function RichTextEditor({ name, initialValue = "", placeholder }: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="bg-white quill-wrapper">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules}
        placeholder={placeholder}
      />
      <input type="hidden" name={name} value={value.replace(/&nbsp;/g, ' ')} />
      <style>{`
        .quill-wrapper .ql-container {
          min-height: 160px;
          font-family: inherit;
          font-size: 1rem;
          color: black;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background-color: #f8fafc;
        }
        .quill-wrapper .ql-editor {
          min-height: 160px;
        }
      `}</style>
    </div>
  );
}
