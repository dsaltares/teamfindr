import React from 'react';
import AvatarBase from '@material-ui/core/Avatar';
import useStyles from './Avatar.styles';
import { User } from '../../store';

type Size = 'small' | 'medium' | 'large';

interface SizeProps {
  size?: Size;
}

type AvatarProps = Pick<User, 'firstName' | 'lastName' | 'avatar'> & SizeProps;

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  avatar,
  size = 'medium',
}) => {
  const classes = useStyles();
  const fullName = `${firstName} ${lastName}`;
  return <AvatarBase className={classes[size]} alt={fullName} src={avatar} />;
};

export default React.memo(Avatar);
