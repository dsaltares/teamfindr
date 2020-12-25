import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AvatarUploader from './AvatarUploader';
import useStyles from './Profile.styles';
import { auth, User } from '../../../store';

const Profile = () => {
  const classes = useStyles();
  const user = auth.useUser() as User;

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
        <div className={classes.avatarContainer}>
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
    </Grid>
  );
};

export default React.memo(Profile);
