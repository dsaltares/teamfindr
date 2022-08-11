import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    background:
      'linear-gradient(90deg, rgba(33,125,42,1) 0%, rgba(68,184,49,1) 100%)',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    boxShadow: '0px 4px 37px rgba(32, 32, 32, 0.25)',
    color: theme.palette.primary.contrastText,
  },
  desktopContainer: {
    borderRadius: 20,
  },
  mobileContainer: {
    borderRadius: '0px 0px 20px 20px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(6),
  },
  appNameContainer: {
    paddingBottom: theme.spacing(4),
  },
  tagLineContainer: {
    paddingBottom: theme.spacing(2),
  },
  titleMedium: {
    fontSize: 30,
  },
  titleLarge: {
    fontSize: 42,
  },
  tagLine: {
    fontSize: 20,
  },
  semiBold: {
    fontWeight: 500,
  },
  bold: {
    fontWeight: 600,
  },
  sportsContainer: {
    paddingBottom: theme.spacing(1),
  },
  seeAllContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(3),
  },
  loginButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    fontWeight: 600,
    minHeight: 50,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

export default useStyles;
