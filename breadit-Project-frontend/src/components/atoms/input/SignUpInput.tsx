import React, { ReactNode } from 'react';
import styled from 'styled-components';
type InputFieldProps = {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

const InputContainer = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};
`;
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;
const StyledInput = styled.input<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '40px'};
  background-color: white;
  padding: 10px 5px;
  margin-bottom: 1px;
  border: none;
  border-bottom: 1px solid #ccc;
  &:focus {
    border-bottom-color: #f0c14b;
    outline: none;
  }
`;
const IconContainer = styled.div`
  position: absolute;
  heigth: 24px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpInput: React.FC<InputFieldProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  width,
  height,
  icon,
  disabled,
}) => {
  return (
    <InputContainer width={width}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputWrapper>
        <StyledInput
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          width={width}
          height={height}
          disabled={disabled}
        />
        {icon && <IconContainer>{icon}</IconContainer>}
      </InputWrapper>
    </InputContainer>
  );
};
