// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WritingArea from './components/WritingArea';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  // Fetch files from the backend when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/files');
        const data = await response.json();
        if (data && data.data) {
          setFiles(data.data);
          // Automatically select the first file if files are present
          if (data.data.length > 0) {
            setSelectedFileId(data.data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  // Update the selectedFileId when files change
  useEffect(() => {
    if (files.length === 0) {
      setSelectedFileId(null);
    } else if (!files.some(file => file.id === selectedFileId)) {
      // If the selected file no longer exists, select the first file
      setSelectedFileId(files[0].id);
    }
  }, [files, selectedFileId]);

  // Find the selected file or fall back to null if no files exist
  const selectedFile = files.find(file => file.id === selectedFileId) || null;
  

  const handleSelectFile = (id) => {
    setSelectedFileId(id);
  };

  // Inside your main component where state is managed, e.g., pages/index.js

  const handleAddNewFile = async () => {
    try {
      const response = await fetch('http://localhost:3001/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New File',
          content: '',
        }),
      });
      const data = await response.json();
      if (data && data.data && data.data.id) {
        const newFile = {
          id: data.data.id,
          title: 'New File',
          content: '',
        };
        
        setFiles(prevFiles => [...prevFiles, newFile]);
      setSelectedFileId(newFile.id);
        fetchFiles(); 
      }
    } catch (error) {
      console.error('Error adding new file:', error);
    }
  };
  
  // This function should be defined outside of useEffect and called within it
  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/files');
      const data = await response.json();
      if (data && data.data) {
        setFiles(data.data);
        // Automatically select the first file if files are present
        if (data.data.length > 0) {
          setSelectedFileId(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, []); 

  const handleSave = async (updatedFile) => {
    // Update the local state
    setFiles(files.map(file => file.id === updatedFile.id ? updatedFile : file));
  
    // Send the update to your backend
    try {
      const response = await fetch('http://localhost:3001/files/' + updatedFile.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFile),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  // Inside your main component where state is managed, e.g., pages/index.js

const handleDeleteFile = async (id, title) => {
  if (window.confirm(`Are you sure you want to delete ${title}?`)) {
    try {
      const response = await fetch(`http://localhost:3001/files/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data && data.changes) {
        const newFiles = files.filter(file => file.id !== id);
        setFiles(newFiles);
        // Update selectedFileId if the deleted file was selected
        if (selectedFileId === id) {
          setSelectedFileId(newFiles.length ? newFiles[0].id : null);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
};


  return (
    <div className="flex h-screen overflow-hidden">
    <Sidebar
      files={files}
      onSelectFile={handleSelectFile}
      onAddNewFile={handleAddNewFile}
      onDeleteFile={handleDeleteFile} // Pass the delete function to the Sidebar
    />
    {selectedFile && <WritingArea selectedFile={selectedFile} onSave={handleSave} />}
  </div>
  );
};

export default Home;
