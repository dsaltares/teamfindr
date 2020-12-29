import React from 'react';
import AvatarBase from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './Avatar.styles';
import { User } from '../../types';

export type Size = 'small' | 'medium' | 'large';
type Variant = 'circle' | 'rounded' | 'circular' | 'square';

interface BaseProps {
  size?: Size;
  variant?: Variant;
  loading?: boolean;
}

type AvatarProps = Pick<User, 'firstName' | 'lastName' | 'avatar'> & BaseProps;

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  avatar,
  size = 'medium',
  variant,
  loading = false,
}) => {
  const classes = useStyles();
  const fullName = `${firstName} ${lastName}`;
  return loading ? (
    <Skeleton className={classes[size]} variant="circle" animation="wave" />
  ) : (
    <AvatarBase
      variant={variant}
      className={classes[size]}
      alt={fullName}
      src={avatar}
    />
  );
};

export default React.memo(Avatar);
