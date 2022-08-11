import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  itemIcon: {
    minWidth: 0,
    paddingRight: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  selectMenu: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
}));

export default useStyles;
