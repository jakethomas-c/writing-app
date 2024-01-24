import React from "react";
import { PlusSquare, Minus } from "lucide-react";

const Sidebar = ({ files, onSelectFile, onAddNewFile, onDeleteFile }) => {
  return (
    <div className="w-48 bg-green-800 text-slate-100 flex flex-col h-screen">
      <div className="font-bold mb-2 p-3  tracking-wide text-xl text-center">
        Writer
      </div>
      <button
        onClick={onAddNewFile}
        className="bg-none opacity-75 hover:opacity-100 transition-all text-white font-bold py-2 rounded ml-2 mr-2 flex items-center justify-center"
      >
        <PlusSquare className="w-5 h-5"/>
      </button>
      <div className="flex-1 overflow-auto">
        {files.map((file, index) => (
          <div
            key={file.id}
            className={`flex justify-between items-center tracking-wide text-sm p-4 ${index !== files.length - 1 ? 'border-b border-slate' : ''}`} // Conditional border-bottom
          >
            <div
              onClick={() => onSelectFile(file.id)}
              className="cursor-pointer flex-1 opacity-75 hover:opacity-100 text-xs transition-all"
            >
              {file.title}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(file.id, file.title);
              }}
              className="opacity-80 hover:opacity-100 rounded-sm bg-none transition-all text-slate-100"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
