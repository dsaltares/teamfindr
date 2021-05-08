import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const createSvgIcon = (SvgComponent, displayName, viewBox) => {
  const Component = ({ svgProps, ...props }, ref) => (
    <SvgIcon
      data-testid={`${displayName}Icon`}
      viewBox={viewBox}
      ref={ref}
      {...props}
    >
      <SvgComponent {...svgProps} />
    </SvgIcon>
  );

  return React.memo(React.forwardRef(Component));
};

export default createSvgIcon;
