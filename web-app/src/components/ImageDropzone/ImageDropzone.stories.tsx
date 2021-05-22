import React, { useState } from 'react';

import ImageDropzone from './ImageDropzone';

const config = { title: 'ImageDropzone' };

export const Default = () => {
  const [file, setFile] = useState<File | undefined>();
  const handleDrop = (newFile: File) => {
    setFile(newFile);
  };
  return (
    <ImageDropzone file={file} onDrop={handleDrop} label="Upload venue image" />
  );
};

export const Error = () => {
  const [file, setFile] = useState<File | undefined>();
  const handleDrop = (newFile: File) => {
    console.log(newFile);
    setFile(newFile);
  };
  return (
    <ImageDropzone
      file={file}
      onDrop={handleDrop}
      label="Upload venue image"
      error="Failed to upload image"
    />
  );
};

export const Loading = () => {
  const [file, setFile] = useState<File | undefined>();
  const handleDrop = (newFile: File) => {
    console.log(newFile);
    setFile(newFile);
  };
  return (
    <ImageDropzone
      file={file}
      onDrop={handleDrop}
      label="Upload venue image"
      loading
    />
  );
};

export default config;
