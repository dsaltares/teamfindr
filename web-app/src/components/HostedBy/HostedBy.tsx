import React from 'react';
import Typography from '@material-ui/core/Typography';
import { User } from '../../types';
import UserAvatar from '../Avatar';
import useStyles from './HostedBy.styles';
import Skeleton from '@material-ui/lab/Skeleton';

interface HostedByProps {
  user?: User;
}

const HostedBy: React.FC<HostedByProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <div className={classes.marginRight}>
        <UserAvatar
          firstName={user?.firstName}
          lastName={user?.lastName}
          size="large"
          avatar={user?.avatar}
          loading={!user}
        />
      </div>
      <div className={classes.flexColumn}>
        <div>
          <Typography variant="body2" color="textPrimary">
            Hosted by
          </Typography>
        </div>
        <div>
          <Typography component="div" variant="body1" color="textPrimary">
            <div className={classes.bold}>
              {user ? (
                `${user.firstName} ${user.lastName}`
              ) : (
                <Skeleton variant="text" animation="pulse" />
              )}
            </div>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HostedBy);
