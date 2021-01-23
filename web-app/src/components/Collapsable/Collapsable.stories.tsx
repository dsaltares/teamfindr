import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TuneIcon from '@material-ui/icons/Tune';
import Collapsable from './Collapsable';

const config = { title: 'Collapsable' };

export const Default = () => {
  const [expanded, setExpanded] = useState(false);
  const onToggle = () => setExpanded(!expanded);
  return (
    <Collapsable
      title="Filters"
      icon={<TuneIcon />}
      expanded={expanded}
      onToggle={onToggle}
      smallOnly
    >
      <Typography>Content</Typography>
    </Collapsable>
  );
};

export default config;
