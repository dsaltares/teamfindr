import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core';

const CancelledIndicator: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.error.light}
      padding={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={6}
    >
      <Typography>
        <Box color={theme.palette.error.main} fontWeight={600}>
          Cancelled event
        </Box>
      </Typography>
    </Box>
  );
};

export default React.memo(CancelledIndicator);
