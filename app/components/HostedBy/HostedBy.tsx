import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import type { User } from '@lib/types';
import UserAvatar from '../Avatar';
import useStyles from './HostedBy.styles';

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
          size="medium"
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
          <Typography component="div" variant="body2" color="textPrimary">
            <div className={classes.bold}>
              {user ? (
                `${user.firstName} ${user.lastName?.substr(0, 1)}.`
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
