import React from "react";
import { FormHelperText, Select, FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function CustomSelect({
  label,
  name,
  control,
  children,
  errors,
  errorMsg,
}) {
  return (
    <FormControl error={errors[name]}>
      <Controller
        control={control}
        name={name}
        defaultValue={""}
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
