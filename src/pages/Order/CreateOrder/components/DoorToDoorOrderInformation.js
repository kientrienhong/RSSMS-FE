import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import TagSelection from "./TagSelection";
export default function DoorToDoorOrderInformation({ choosenProduct }) {
  const [timeDelivery, setTimeDelivery] = useState({});

  const [isCustomerDelivery, setIsCustomerDelivery] = React.useState(false);
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const [duration, setDuration] = useState(0);
  const handleChange = (event) => {
    setIsCustomerDelivery(event.target.checked);
    setTimeDelivery({});
  };

  const handleChangeDeliveryDate = (e) => {
    setDateDelivery(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(dateReturn);
      let parseDateDelivery = new Date(e.target.value);
      var diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      var diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const handleChaneReturnDate = (e) => {
    setDateReturn(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(e.target.value);
      let parseDateDelivery = new Date(dateDelivery);
      var diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      var diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const listTime = [
    { name: "8am - 10am", isAvailable: true },
    { name: "10am - 12am", isAvailable: true },
    { name: "12pm - 14pm", isAvailable: true },
    { name: "14am - 16pm", isAvailable: true },
    { name: "18am - 20am", isAvailable: true },
  ];

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" style={{ marginBottom: "3%" }}>
        Time
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "4%",
        }}
      >
        <FormControlLabel
          value="isCustomerDelivery"
          control={
            <Checkbox checked={isCustomerDelivery} onChange={handleChange} />
          }
          label="Customer delivery by themselves"
          labelPlacement="Customer delivery by themselves"
        />
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Delivery Date Time
        </Typography>
        <TextField
          id="date"
          type="date"
          sx={{ width: 220, marginBottom: "16px" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeDeliveryDate}
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
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Return Date Time
        </Typography>
        <TextField
          id="date"
          type="date"
          sx={{ width: 220, marginBottom: "16px" }}
          onChange={handleChaneReturnDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Duration
          </Typography>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            {duration} days
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
