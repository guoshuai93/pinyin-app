import React, { useState, useEffect, useMemo } from "react";
import { uniqueStr } from "./util";

const RadioGroup = ({ data, value, disabled = false, onChange }) => {
  const groupName = useMemo(() => uniqueStr(), []);
  const [groupValue, setGroupValue] = useState(value);

  useEffect(() => {
    setGroupValue(value);
  }, [value]);

  const handleChange = (e) => {
    let v = e.target.value;
    setGroupValue(v);
    onChange && onChange(v);
  };

  return (
    <div className="radio-group">
      {data.map((i, index) => {
        return (
          <Radio
            groupName={groupName}
            groupValue={groupValue}
            disabled={disabled}
            key={index}
            label={i.label}
            value={i.value}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

const Radio = ({ label, value, groupValue, groupName, disabled, onChange }) => {
  let uniqueFlag = uniqueStr();
  return (
    <div className="radio-item">
      <input
        type="radio"
        disabled={disabled}
        id={uniqueFlag}
        name={groupName}
        value={value}
        checked={value === groupValue}
        onChange={onChange}
      />
      <label className="radio-item-label" htmlFor={uniqueFlag}>
        {label}
      </label>
    </div>
  );
};

export default RadioGroup;
