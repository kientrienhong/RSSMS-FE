import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@material-ui/core";
import TagSelection from "../CreateOrder/components/TagSelection";
import CustomInput from "../../../components/CustomInput";
import { MenuItem, Select, FormControl } from "@material-ui/core";

const styleModal = {
  position: "absolute",
  top: "0%",
  right: "0",
  //   transform: "translate(-50%, -50%)",
  width: "40%",
  height: "92vh",
  overflow: "hidden",
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const listTime = [
  { name: "8am - 10am", isAvailable: true },
  { name: "10am - 12am", isAvailable: true },
  { name: "12pm - 14pm", isAvailable: true },
  { name: "14am - 16pm", isAvailable: true },
  { name: "18am - 20am", isAvailable: true },
];
export default function OrderModal({
  open,
  handleClose,
  currentOrder,
  handleSubmit,
  control,
}) {
  const [isCustomerDelivery, setIsCustomerDelivery] = useState(false);
  const [timeDelivery, setTimeDelivery] = useState({});
  const [duration, setDuration] = useState(0);
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const handleChangeCheckBox = (event) => {
    setIsCustomerDelivery(event.target.checked);
    setTimeDelivery({});
  };

  const listStatus = [
    { label: "Booked", value: 1 },
    { label: "Paid", value: 2 },
    { label: "Delivery", value: 3 },
    { label: "Stored", value: 4 },
    { label: "Expired", value: 5 },
  ];

  const generateSelectOptions = () => {
    return listStatus.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const handleChangeDeliveryDate = (e) => {
    setDateDelivery(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(dateReturn);
      let parseDateDelivery = new Date(e.target.value);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const handleChaneReturnDate = (e) => {
    setDateReturn(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(e.target.value);
      let parseDateDelivery = new Date(dateDelivery);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const mapListTime = (time, setTime) =>
    listTime.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={setTime}
          setIsCustomerDelivery={setIsCustomerDelivery}
        />
      </Grid>
    ));
  const buildInformation = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
        }}
      >
        <Typography color="black" variant="h2">
          {title}
        </Typography>
        <p style={{ fontSize: "18px" }}>{value}</p>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          pading: "3%",
        }}
      >
        <form style={{ width: "100%" }}>
          <Typography color="black" variant="h2" sx={{ marginBottom: "4%" }}>
            Order Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography color="black" variant="h2">
              Order id
            </Typography>
            <Typography color="black" variant="h2">
              #{currentOrder?.id}
            </Typography>
          </Box>
          {buildInformation("Customer name", currentOrder?.customerName)}
          {buildInformation("Customer phone", currentOrder?.customerPhone)}
          {buildInformation("Type", currentOrder?.type)}
          <Typography
            color="black"
            variant="h2"
            sx={{ marginBottom: "4%", marginTop: "4%" }}
          >
            Time
          </Typography>
          <Typography color="black" variant="h3" sx={{ marginBottom: "2%" }}>
            Delivery Date Time
          </Typography>
          <TextField
            id="date"
            type="date"
            onChange={handleChangeDeliveryDate}
            sx={{ width: 220, marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid
            container
            spacing={2}
            sx={{
              width: "98%",
              marginBottom: "3%",
            }}
          >
            {mapListTime(timeDelivery, setTimeDelivery)}
          </Grid>
          <FormControlLabel
            value="isCustomerDelivery"
            control={
              <Checkbox
                checked={isCustomerDelivery}
                onChange={handleChangeCheckBox}
              />
            }
            label="Customer delivery by themselves"
            labelPlacement="Customer delivery by themselves"
          />
          <Typography color="black" variant="h3" sx={{ marginBottom: "2%" }}>
            Return Date Time
          </Typography>
          <TextField
            id="date"
            onChange={handleChaneReturnDate}
            type="date"
            sx={{ width: 220, marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2%",
            }}
          >
            <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
              Durations:
            </Typography>
            <Typography color="primary" variant="h3">
              {duration} days
            </Typography>
          </Box>
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Delivery address:
          </Typography>
          <CustomInput
            control={control}
            rules={{}}
            styles={{ width: "300px" }}
            name="deliveryAddress"
            label="Delivery Address"
            disabled={false}
            userInfo={""}
            inlineStyle={{}}
          />
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Delivery item address:
          </Typography>
          <CustomInput
            control={control}
            rules={{}}
            styles={{ width: "300px" }}
            name="returnAddress"
            label="Return Address"
            disabled={false}
            userInfo={""}
            inlineStyle={{}}
          />
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Status
          </Typography>
          <FormControl
            sx={{ m: 1, minWidth: 120, color: "black", margin: "0" }}
            name="boxSize"
          >
            <Select
              displayEmpty
              sx={{
                marginTop: "11%",
              }}
            >
              {generateSelectOptions()}
            </Select>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}
