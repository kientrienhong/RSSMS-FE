import React from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const CustomSelect = ({ name, userInfo, control, options, rules }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
      <Controller
        control={control}
        name={name}
        defaultValue={userInfo}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSelectOptions()}
          </Select>
        )}
        rules={rules}
      />
    </FormControl>
  );
};
