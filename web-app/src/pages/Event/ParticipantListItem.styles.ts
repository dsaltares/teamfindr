import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  listItemText: {
    color: theme.palette.text.secondary,
  },
  button: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      borderColor: theme.palette.error.light,
    },
  },
}));

export default useStyles;
