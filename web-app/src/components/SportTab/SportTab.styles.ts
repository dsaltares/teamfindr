import { makeStyles } from '@material-ui/core/styles';

interface SportTabStyleProps {
  inImage?: boolean;
}

const useStyles = makeStyles((theme) => ({
  tab: (props: SportTabStyleProps) => ({
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: props.inImage ? '6px 0px' : '6px 6px 0px 0px',
  }),
  cancelled: () => ({
    backgroundColor: theme.palette.grey[500],
  }),
  text: () => ({
    marginRight: theme.spacing(2),
    textTransform: 'uppercase',
  }),
}));

export default useStyles;
