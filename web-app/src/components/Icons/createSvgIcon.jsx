import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const createSvgIcon = (SvgComponent, viewBox) => {
  const Component = (props: SvgIconProps, ref) => (
    <SvgIcon viewBox={viewBox} ref={ref} {...props}>
      <SvgComponent />
    </SvgIcon>
  );

  return React.memo(React.forwardRef(Component));
};

export default createSvgIcon;
