import React from 'react';
import clsx from 'clsx';
import type SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import type { Sport } from '@lib/types';
import SportIcons from '@lib/utils/sportIcons';
import useStyles from './SportTab.styles';

interface SportTabProps {
  sport?: Sport;
  isCancelled?: boolean;
  inImage?: boolean;
}

const SportTab: React.FC<SportTabProps> = ({ sport, isCancelled, inImage }) => {
  const classes = useStyles({ inImage });
  const Icon = sport && (SportIcons[sport] as typeof SvgIcon);

  return (
    <div className={clsx(isCancelled && classes.cancelled, classes.tab)}>
      <div className={classes.text}>
        <Typography variant="body2">{sport}</Typography>
      </div>
      <div>{Icon && <Icon fontSize="small" />}</div>
    </div>
  );
};

export default React.memo(SportTab);
