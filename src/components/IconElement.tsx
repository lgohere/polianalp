import React, { FC, ComponentType } from 'react';
import { IconType, IconBaseProps } from 'react-icons';

// Interface for the component props
interface IconElementProps {
  icon: IconType;
  style?: React.CSSProperties; // Add style prop
  [key: string]: any; // Add index signature for any additional props
}

// Component that renders react-icons correctly
const IconElement: FC<IconElementProps> = ({ icon, style, ...rest }) => {
  // Convert IconType to ComponentType explicitly to resolve typing error
  const IconComponent = icon as ComponentType<IconBaseProps>;
  return <IconComponent style={style} {...rest} />;
};

export default IconElement; 