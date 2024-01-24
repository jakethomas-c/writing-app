// components/FileItem.js
import React from 'react';

const FileItem = ({ file, onSelectFile, isActive, onDeleteFile }) => {
    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent onSelectFile from being called
        onDeleteFile(file.id);
      };
  return (
    <div
      onClick={() => onSelectFile(file.id)}
      className={`cursor-pointer p-2 hover:bg-gray-700 ${isActive ? 'bg-gray-600' : ''}`}
    >
      {file.title}
    </div>
  );
};

export default FileItem;
