import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  centered: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing(2),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
  },
  pageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '900px',
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
  },
}));

export default useStyles;
