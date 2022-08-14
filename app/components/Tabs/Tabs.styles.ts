import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabs: {
    padding: 4,
    borderRadius: 92,
    backgroundColor: theme.palette.common.white,
  },
  indicator: {
    display: 'none',
  },
  tab: {
    borderRadius: 63,
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: '0px 14px 30px rgba(36, 130, 43, 0.2)',
  },
  tabPanel: {
    paddingTop: theme.spacing(2),
  },
  tabLabelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 28,
    paddingRight: theme.spacing(1),
  },
}));

export default useStyles;
