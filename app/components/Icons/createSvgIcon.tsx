import React from 'react';
import type { SvgIconProps } from '@material-ui/core/SvgIcon';
import SvgIcon from '@material-ui/core/SvgIcon';

type SvgRef =
  | ((instance: SVGSVGElement | null) => void)
  | React.RefObject<SVGSVGElement>
  | null
  | undefined;

const createSvgIcon = (
  SvgComponent: React.ComponentType,
  viewBox: string | undefined
) => {
  const Component = (props: SvgIconProps, ref: SvgRef) => (
    <SvgIcon viewBox={viewBox} ref={ref} {...props}>
      <SvgComponent />
    </SvgIcon>
  );

  return React.memo(React.forwardRef(Component));
};

export default createSvgIcon;
