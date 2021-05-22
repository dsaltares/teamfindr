import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './ImageDropzone.styles';

interface ImageDropzoneProps {
  loading?: boolean;
  file?: File;
  onDrop: (file: File) => void;
  label: string;
  error?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  loading,
  file,
  onDrop,
  label,
  error,
}) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (files) => onDrop(files[0]),
    accept: 'image/*',
    maxFiles: 1,
    disabled: loading,
  });

  const [imageSrc, setImageSrc] = useState<string | undefined>();
  useEffect(() => {
    if (!file) {
      return;
    }

    var fr = new FileReader();
    fr.onload = function () {
      setImageSrc(fr.result as string);
    };
    fr.readAsDataURL(file);
  }, [file]);

  const classes = useStyles({
    isDragAccept,
    isDragActive,
    isDragReject,
    isFocused,
    isError: !!error,
    disabled: loading,
    hasImage: !!imageSrc,
  });

  let content = (
    <>
      <div className="row">
        {loading ? (
          <CircularProgress size={48} color="primary" />
        ) : (
          <CloudUploadIcon
            className={classes.icon}
            color="primary"
            fontSize="inherit"
          />
        )}
      </div>
      <div className="row">
        <Typography variant="body1" color="primary">
          {loading ? 'Uploading' : label}
        </Typography>
      </div>
      <div className="row">
        {error && (
          <Grid item>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Grid>
        )}
      </div>
    </>
  );

  if (loading) {
    content = (
      <Skeleton variant="rect" animation="pulse" width="100%" height="100%" />
    );
  } else if (imageSrc) {
    content = (
      <img
        className={clsx(classes.image, loading && classes.loadingImage)}
        alt="uploaded"
        src={imageSrc}
      />
    );
  }

  return (
    <div role="button" className={classes.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {content}
    </div>
  );
};

export default React.memo(ImageDropzone);
