import React from 'react';
import styled from 'styled-components';

type InputFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 50px;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #f0c14b;
    outline: none;
  }
`;

export const Input: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  value,
  width,
  onChange,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      width={width}
      onChange={onChange}
    />
  );
};
