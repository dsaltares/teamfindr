import React, { useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '../../../components/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './AvatarUploader.styles';
import { auth, User } from '../../../store';

const AvatarUploader = () => {
  const classes = useStyles();
  const user = auth.useUser() as User;
  const changeAvatar = auth.useChangeAvatar();
  const changingAvatar = auth.useChangingAvatar();
  const inputEl = useRef<HTMLInputElement>(null);
  const handleAvatarClicked = () => {
    const current = inputEl?.current;
    if (current) {
      current.click();
    }
  };
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    changeAvatar(files[0]);
  };

  return (
    <>
      <Tooltip
        title="Change avatar"
        aria-label="change avatar"
        placement="right"
      >
        <IconButton onClick={handleAvatarClicked} disabled={changingAvatar}>
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={user.avatar}
            size="large"
            variant="circular"
            loading={changingAvatar}
          />
        </IconButton>
      </Tooltip>
      <input
        ref={inputEl}
        className={classes.visuallyHidden}
        type="file"
        accept="image/*"
        onChange={handleSelectFile}
      />
    </>
  );
};

export default React.memo(AvatarUploader);
