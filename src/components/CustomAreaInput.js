import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize } from "@material-ui/core";

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
          <TextareaAutosize
            label={label}
            disabled={disabled}
            minRows={2}
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
