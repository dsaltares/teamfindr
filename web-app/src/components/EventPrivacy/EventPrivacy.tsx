import React from 'react';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import useStyles from './EventPrivacy.styles';

interface EventPrivacyProps {
  isPrivate: boolean;
}

const EventPrivacy: React.FC<EventPrivacyProps> = ({ isPrivate }) => {
  const classes = useStyles();

  const mainText = isPrivate ? 'Private event' : 'Public event';
  const secondaryText = isPrivate ? 'Join via link only' : 'Anyone can join';
  const icon = isPrivate ? (
    <LockIcon color="primary" />
  ) : (
    <PersonIcon color="primary" />
  );

  return (
    <div className={classes.flex}>
      <div className={classes.marginRight}>{icon}</div>
      <div className={classes.flexColumn}>
        <div>
          <Typography variant="body1" color="textPrimary">
            <div className={classes.bold}>{mainText}</div>
          </Typography>
        </div>
        <div>
          <Typography component="div" variant="body2" color="textPrimary">
            {secondaryText}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventPrivacy);
