import React, { useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '../../../components/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import useStyles from './AvatarUploader.styles';
import { useUser, useChangeAvatar } from '../../../hooks';
import { User } from '../../../types';

const AvatarUploader = () => {
  const classes = useStyles();
  const user = useUser().user as User;
  const { mutate: changeAvatar, isLoading: changingAvatar } = useChangeAvatar();
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
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={
              <div className={classes.iconContainer}>
                <CameraAltIcon className={classes.icon} />
              </div>
            }
          >
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              size="xLarge"
              variant="circular"
              loading={changingAvatar}
            />
          </Badge>
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
