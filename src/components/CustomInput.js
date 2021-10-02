import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function CustomInput({
  control,
  rules,
  styles,
  name,
  label,
  userInfo,
  type,
  inlineStyle,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={userInfo}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          value={value}
          style={inlineStyle}
          onChange={onChange}
          type={type}
          error={!!error}
          inputProps={{ style: styles }}
          helperText={error ? error.message : null}
        />
      )}
      rules={rules}
    />
  );
}
