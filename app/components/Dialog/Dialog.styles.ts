import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minWidth: 500,
  },
  small: {
    maxWidth: 500,
  },
  medium: {
    maxWidth: 600,
  },
  large: {
    maxWidth: 700,
  },
  bold: {
    fontWeight: 500,
  },
  title: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 0px 8px 8px rgba(32, 32, 32, 0.15)',
    borderRadius: '0px 0px 10px 10px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
