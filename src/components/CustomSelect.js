import React from "react";
import { FormHelperText, Select, FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function CustomSelect({
  name,
  control,
  children,
  errors,
  errorMsg,
  defaultValue,
}) {
  return (
    <FormControl error={errors[name]} sx={{ marginLeft: "8px" }}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Select onChange={onChange} value={value}>
              {children}
            </Select>
          );
        }}
        rules={{ required: errorMsg }}
      />
      <FormHelperText error={errors[name]}>
        {errors[name] ? errors[name].message : ""}
      </FormHelperText>
    </FormControl>
  );
}
