"use client"
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import FileTitle from './FileTitle';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);


const saveDebounced = _.debounce((onSaveFunc, updatedFile) => {
  onSaveFunc(updatedFile);
}, 20);

const WritingArea = ({ selectedFile, onSave }) => {
  const [content, setContent] = useState(selectedFile.content);

  useEffect(() => {
    setContent(selectedFile.content);
  }, [selectedFile]);

  const handleContentChange = (content) => {
    setContent(content);
    const updatedFile = { ...selectedFile, content: content };
    saveDebounced(onSave, updatedFile);
  };

  const handleTitleChange = (e) => {
    const updatedFile = { ...selectedFile, title: e.target.value };
    saveDebounced(onSave, updatedFile);
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "code"],
      [{ script: "sub" }, { script: "super" }],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "code",
    "script",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div className="flex flex-col flex-1">
      <FileTitle
        title={selectedFile.title}
        onTitleChange={handleTitleChange}
      />
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        className="flex-1 bg-slate-50 text-black"
        theme="snow" // You can use "bubble" for a simpler appearance
        modules={modules}
        toolbar={toolbar}
      />
    </div>
  );
};

export default WritingArea;
