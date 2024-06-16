import { FC } from 'react';
import styled from 'styled-components';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
};

const CheckboxContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
`;

const StyledLabel = styled.label<Pick<CheckboxProps, 'checked' | 'size'>>`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: ${({ size }) => size || 24}px;
  width: ${({ size }) => size || 24}px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    width: 12px;
    height: 6px;
    border: 1px solid #575757;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    opacity: 0;
  }

  ${({ checked }) =>
    checked &&
    `
    background-color: #FFCB46;
    border-color: #575757;

    &:after {
      opacity: 1;
    }
  `}
`;

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, size }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={handleChange} />
      <StyledLabel checked={checked} size={size} />
    </CheckboxContainer>
  );
};

export default Checkbox;
