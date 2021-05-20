import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  listItemAvatar: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  listItemText: {
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
