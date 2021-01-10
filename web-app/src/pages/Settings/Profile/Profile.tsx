import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AvatarUploader from './AvatarUploader';
import useStyles from './Profile.styles';
import { useUser, useLogout } from '../../../hooks';
import { User } from '../../../types';

const Profile = () => {
  const classes = useStyles();
  const user = useUser().user as User;
  const logout = useLogout();

  const dataItems = [
    {
      key: 'name',
      Icon: PersonIcon,
      text: `${user?.firstName} ${user?.lastName}`,
    },
    {
      key: 'email',
      Icon: EmailIcon,
      text: user.email,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      spacing={4}
      justify="center"
      alignContent="center"
    >
      <Grid item>
        <div className={classes.centeredContainer}>
          <AvatarUploader />
        </div>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          spacing={2}
          justify="center"
          alignContent="center"
        >
          {dataItems.map((item) => (
            <Grid key={item.key} item>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <item.Icon color="primary" />
                </Grid>
                <Grid item>
                  <Typography>{item.text}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item alignItems="center">
        <div className={classes.centeredContainer}>
          <Button color="primary" variant="text" onClick={logout}>
            Log out
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default React.memo(Profile);
