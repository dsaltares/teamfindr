import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: '100%',
  },
  itemIcon: {
    minWidth: 0,
    paddingRight: theme.spacing(1),
  },
}));

export default useStyles;
