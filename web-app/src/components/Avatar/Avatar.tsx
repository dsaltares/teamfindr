import React from 'react';
import AvatarBase from '@material-ui/core/Avatar';
import useStyles from './Avatar.styles';
import { User } from '../../store';

type Size = 'small' | 'medium' | 'large';
type Variant = 'circle' | 'rounded' | 'circular' | 'square';

interface BaseProps {
  size?: Size;
  variant?: Variant;
}

type AvatarProps = Pick<User, 'firstName' | 'lastName' | 'avatar'> & BaseProps;

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  avatar,
  size = 'medium',
  variant,
}) => {
  const classes = useStyles();
  const fullName = `${firstName} ${lastName}`;
  return (
    <AvatarBase
      variant={variant}
      className={classes[size]}
      alt={fullName}
      src={avatar}
    />
  );
};

export default React.memo(Avatar);
