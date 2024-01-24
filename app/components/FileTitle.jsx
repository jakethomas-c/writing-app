import React from 'react';

const FileTitle = ({ title, onTitleChange }) => {
  return (
    <input
      type="text"
      value={title}
      onChange={onTitleChange}
    className="font-bold p-3  w-full text-black focus:outline-none tracking-wide text-sm"
      placeholder="File title"
    />
  );
};

export default FileTitle;
