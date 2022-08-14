import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 600,
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
