import React from "react";
import { Controller, TextField } from "@material-ui/core";
export default function CustomInput({ control, rules, styles, name }) {
  return (
    <Controller
      name="firstName"
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label="First Name"
          variant="filled"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={{ required: "First name required" }}
    />
  );
}
