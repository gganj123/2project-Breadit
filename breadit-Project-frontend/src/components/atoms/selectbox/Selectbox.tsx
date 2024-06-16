import React from 'react';

type Option = {
  value: string;
  name: string;
};

type Props = {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  className?: string; // className prop 추가
};

const SelectBox: React.FC<Props> = (props) => {
  const { options, onChange, value, className } = props;

  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
