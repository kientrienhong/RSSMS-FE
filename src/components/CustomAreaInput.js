import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

export default function CustomAreaInput({
  control,
  rules,
  styles,
  name,
  label,
  userInfo,
  type,
  inlineStyle,
  disabled,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={userInfo}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            label={label}
            disabled={disabled}
            multiline
            rows={2}
            rowsMax={4}
            variant="outlined"
            value={value}
            style={inlineStyle}
            onChange={onChange}
            type={type}
            error={!!error}
            inputProps={{ style: styles }}
            helperText={error ? error.message : null}
          />
        );
      }}
      rules={rules}
    />
  );
}
