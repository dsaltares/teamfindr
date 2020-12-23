import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  baseRoot: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  facebookRoot: {
    backgroundColor: '#4267B2',
    '&:hover': {
      backgroundColor: '#2e487c',
    },
  },
  googleRoot: {
    backgroundColor: '#DB4437',
    '&:hover': {
      backgroundColor: '#a2271d',
    },
  },
  twitterRoot: {
    backgroundColor: '#1DA1F2',
    '&:hover': {
      backgroundColor: '#0a73b3',
    },
  },
}));

export default useStyles;
