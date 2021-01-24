import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Link from '@material-ui/core/Link';
import AvatarUploader from './AvatarUploader';
import { useUser, useLogout } from '../../../hooks';
import { User } from '../../../types';
import Policies from '../../../utils/policies';

const Profile = () => {
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
      alignItems="center"
    >
      <Grid item>
        <AvatarUploader />
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
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Link
              href={Policies.Privacy}
              target="_blank"
              rel="nofollow noreferrer"
              underline="none"
            >
              Privacy policy
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={Policies.Terms}
              target="_blank"
              rel="nofollow noreferrer"
              underline="none"
            >
              Terms and conditions
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={Policies.Cookies}
              target="_blank"
              rel="nofollow noreferrer"
              underline="none"
            >
              Cookie policy
            </Link>
          </Grid>
          <Grid item>
            <Button color="primary" variant="text" onClick={logout}>
              Log out
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Profile);
