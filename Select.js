import {
  Select as BaseSelect,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React from "react";

const Select = ({ handleSelectType }) => {
  const option = [
    { value: "celsius", lable: "Celsius" },
    { value: "fahrenheit", lable: "Fahrenheit" },
    { value: "kelvin", lable: "Kelvin" },
  ];
  const handleChange = (event) => {
    const value = event.target.value;
    handleSelectType(value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <BaseSelect
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={option.value}
          onChange={handleChange}
          autoWidth
          label="Type"
        >
          {option.map(({ lable, value }) => {
            return (
              <MenuItem key={value} value={value}>
                {lable}
              </MenuItem>
            );
          })}
        </BaseSelect>
      </FormControl>
    </div>
  );
};

export default Select;
