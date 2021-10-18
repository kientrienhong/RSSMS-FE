import React from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  RadioGroup,
  FormControl,
  Radio,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";

import { useForm } from "react-hook-form";

const styleInput = { marginRight: "2.5%", backgroundColor: "white" };

export default function InputInfor() {
  const { handleSubmit, reset, control } = useForm();

  return (
    <Box
      sx={{
        height: "auto",
        py: 3,
        display: "flex",
        backgroundColor: "background.default",
        flexDirection: "column",
        paddingLeft: "48px",
      }}
    >
      <Typography
        color="primary"
        variant="h2"
        style={{ marginTop: "2%", textAlign: "left" }}
      >
        Search user
      </Typography>
      <TextField
        label="Phone"
        sx={{
          width: "80%",
          marginTop: "1%",
        }}
        InputProps={{
          style: {
            height: "45px",
            backgroundColor: "white",
            width: "200px",
          },
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        color="primary"
        variant="h2"
        style={{ marginTop: "2%", textAlign: "left" }}
      >
        Customer information
      </Typography>
      <form>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
          <CustomInput
            control={control}
            rules={{
              required: "Name required",
            }}
            styles={{ width: "320px" }}
            name="name"
            label="Name"
            disabled={false}
            userInfo={""}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            rules={{
              required: "Email required",
            }}
            styles={{ width: "320px" }}
            name="email"
            label="Email"
            disabled={false}
            userInfo={""}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            rules={{
              required: "Phone required",
            }}
            styles={{ width: "120px" }}
            name="phone"
            label="Phone"
            disabled={false}
            userInfo={""}
            inlineStyle={styleInput}
          />
        </Box>
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Delivery Address
        </Typography>
        <CustomInput
          control={control}
          rules={{
            required: "Address required",
          }}
          styles={{ width: "320px" }}
          name="deliveryAddress"
          label="Delivery Address"
          disabled={false}
          userInfo={""}
          inlineStyle={styleInput}
        />
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Return item address
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="The same with delivery address"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Difference with delivery address"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Not determine yet"
            />
          </RadioGroup>
        </FormControl>
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Note
        </Typography>
        <CustomAreaInput
          control={control}
          rules={{ required: "Note is required" }}
          styles={{ width: "560px" }}
          name="note"
          label=""
          inlineStyle={{ ...styleInput }}
        />
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Payment method
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender">
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Pay on cash"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Transfer money"
            />
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              display: "block",
              height: "45px",
              paddingLeft: "16px",
              marginTop: "16px",
              paddingRight: "16px",
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
