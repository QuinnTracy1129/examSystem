import React from "react";
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from "mdbreact";

export default function CustomSelect({
  choices = [],
  preValue = "",
  onChange = () => {},
  getObject = false,
  label,
  values,
  texts,
  className = "",
  disableAll = false,
  multiple = false,
  disabledAllExceptSelected = false,
  disableByKey = {},
}) {
  const handleDisabling = (value, obj) => {
    if (disableAll) return true;
    if (disabledAllExceptSelected && value !== preValue) return true;

    if (!!Object.keys(disableByKey).length) {
      for (const key in disableByKey) {
        if (obj[key] === disableByKey[key]) return true;
      }
    }

    return false;
  };

  return (
    <MDBSelect
      label={label}
      getValue={array => {
        if (multiple)
          return onChange(
            getObject ? choices.filter(c => array.includes(c[values])) : array
          );

        onChange(
          getObject
            ? choices.find(choice => choice[values] === array[0])
            : array[0]
        );
      }}
      className={className}
      multiple={multiple}
      color="primary"
    >
      <MDBSelectInput selected={preValue} />
      <MDBSelectOptions search={choices.length >= 10} searchId={label}>
        {choices.map((choice, index) => {
          const value = choice[values],
            text = choice[texts];

          return (
            <MDBSelectOption
              id={`${label}-${value}`}
              disabled={handleDisabling(value, choice)}
              checked={preValue ? value === preValue : false}
              key={`${label}-${index}`}
              value={value}
            >
              {text}
            </MDBSelectOption>
          );
        })}
      </MDBSelectOptions>
    </MDBSelect>
  );
}
