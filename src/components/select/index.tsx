import React from 'react';

interface ValueItem {
  id: string,
  value: string,
  name: string,
}

interface OwnProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  values: ValueItem[];
}

const Select: React.FC<OwnProps> = ({ values, ...props}) => {
  return (
    <select
      className="form-select"
      {...props}
    >
      <option value="">Select</option>
      {values.map((item: ValueItem) => (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export { Select };
