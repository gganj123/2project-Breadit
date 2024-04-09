import { FC, ReactNode, MouseEvent } from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = {
  text: string;
  backcolor: string;
  textcolor: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type: 'button' | 'submit';
  icon?: ReactNode;
  width?: string;
  height?: string;
  disabled?: boolean;
  borderradius?: string;
};

const Button: FC<ButtonProps> = ({
  text,
  backcolor,
  textcolor,
  onClick,
  type,
  icon,
  width,
  height,
  disabled,
  borderradius,
}) => {
  return (
    <StyledButton
      backcolor={backcolor}
      textcolor={textcolor}
      onClick={onClick}
      type={type}
      hasicon={icon ? 'true' : 'false'}
      width={width}
      height={height}
      disabled={disabled}
      borderradius={borderradius}
    >
      {icon && <span className="icon-container">{icon}</span>}
      {text}
    </StyledButton>
  );
};

export default Button;
