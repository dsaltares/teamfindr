import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
    marginBottom: theme.spacing(4),
  },
  link: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  cardWrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  sportTab: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: '6px 6px 0px 0px',
  },
  sportTabCancelled: {
    backgroundColor: theme.palette.grey[500],
  },
  sportWrapper: {
    marginRight: theme.spacing(2),
    textTransform: 'uppercase',
  },
  sportCard: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyItems: 'center',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: '0px 6px 6px 6px',
  },
  venueImage: {
    width: 125,
    height: 125,
    objectFit: 'cover',
    borderRadius: 6,
  },
  infoIconWrapper: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  flex: {
    display: 'flex',
  },
  imgContainer: {
    marginRight: theme.spacing(1),
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  eventDatumRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  eventDataRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventDatumCell: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  dividerContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardBottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 500,
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
