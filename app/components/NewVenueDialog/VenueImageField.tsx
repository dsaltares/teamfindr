import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useUploadImage } from '@lib/hooks';
import ImageDropzone from '../ImageDropzone';

interface VenueImageFieldProps {
  name: string;
  error?: string;
}

const VenueImageField: React.FC<VenueImageFieldProps> = ({ name, error }) => {
  const { setFieldValue } = useFormikContext();
  const [file, setFile] = useState<File | undefined>();
  const {
    mutate: uploadImage,
    isLoading,
    isError,
    data: imageUrl,
  } = useUploadImage();

  const handleDrop = useCallback(
    (file: File) => {
      uploadImage(file);
      setFile(file);
    },
    [setFile, uploadImage]
  );

  useEffect(() => {
    if (!imageUrl) {
      return;
    }
    setFieldValue(name, imageUrl);
  }, [imageUrl, setFieldValue, name]);

  return (
    <ImageDropzone
      file={file}
      onDrop={handleDrop}
      label="Upload venue image"
      loading={isLoading}
      error={isError ? 'Failed to upload image' : error}
    />
  );
};

export default React.memo(VenueImageField);
