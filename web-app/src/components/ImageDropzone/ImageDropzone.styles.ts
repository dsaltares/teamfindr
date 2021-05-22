import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps {
  isDragAccept: boolean;
  isDragActive: boolean;
  isDragReject: boolean;
  isFocused: boolean;
  isHover?: boolean;
  isError?: boolean;
  disabled?: boolean;
  hasImage: boolean;
}

const borderColorFromProps = (theme: Theme, props: StyleProps) => {
  if (props.disabled) {
    return theme.palette.grey[400];
  }
  if (props.isDragActive) {
    return theme.palette.primary.main;
  }
  if (props.isDragReject || props.isError) {
    return theme.palette.error.main;
  }
  if (props.isDragActive) {
    return theme.palette.primary.light;
  }
  if (props.isHover || props.isFocused) {
    return theme.palette.grey[600];
  }
  return theme.palette.grey[400];
};

const backgroundColorFromProps = (theme: Theme, props: StyleProps) => {
  if (props.isDragActive) {
    return '#F4F9F4';
  }
  if (props.isDragReject) {
    return theme.palette.error.light;
  }
  if (props.isDragActive) {
    return '#F4F9F4';
  }
  return undefined;
};

const useStyles = makeStyles((theme) => ({
  container: (props: StyleProps) => ({
    height: 125,
    borderRadius: 6,
    borderStyle: props.hasImage ? 'none' : 'dashed',
    borderWidth: 2,
    borderColor: borderColorFromProps(theme, props),
    backgroundColor: backgroundColorFromProps(theme, props),
    cursor: props.disabled ? 'inherit' : 'pointer',
    '&:hover': {
      borderColor: borderColorFromProps(theme, { ...props, isHover: true }),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
  icon: {
    fontSize: 48,
  },
  image: {
    width: '100%',
    height: 125,
    objectFit: 'cover',
    borderRadius: 6,
    '&:hover': {
      opacity: 0.8,
    },
  },
  loadingImage: {
    opacity: 0.6,
    '&:hover': {
      opacity: 0.5,
    },
  },
  row: {
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
