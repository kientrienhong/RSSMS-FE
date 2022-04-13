import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  handleChange,
  listData,
  currentData,
  name,
}) {
  return (
    <div>
      <FormControl sx={{m: 1, width: 300}}>
        <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={currentData}
          onChange={handleChange}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => {
            let newSelected = selected?.map((e) => listData[e]["name"]);
            return newSelected.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {listData?.map((e) => (
            <MenuItem key={e.value} value={e.value}>
              <Checkbox checked={currentData?.indexOf(e.value) > -1} />
              <ListItemText primary={e.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
