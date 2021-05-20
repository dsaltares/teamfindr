import React from 'react';
import cslx from 'clsx';
import AvatarBase from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './Avatar.styles';
import { User } from '../../types';

export type Size = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
type Variant = 'circle' | 'rounded' | 'circular' | 'square';

interface BaseProps {
  size?: Size;
  variant?: Variant;
  loading?: boolean;
  placeholder?: boolean;
}

type AvatarProps = Pick<User, 'firstName' | 'lastName' | 'avatar'> & BaseProps;

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  avatar,
  size = 'medium',
  variant,
  loading = false,
  placeholder = false,
}) => {
  const classes = useStyles();
  const fullName = `${firstName} ${lastName}`;

  if (placeholder) {
    return <div className={cslx(classes[size], classes.placeholder)} />;
  }

  if (loading) {
    <Skeleton className={classes[size]} variant="circle" animation="wave" />;
  }

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
