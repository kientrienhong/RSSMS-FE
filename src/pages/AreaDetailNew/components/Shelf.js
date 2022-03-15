import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Floor from "./Floor";

export default function Shelf({
  handleOpen,
  expanded,
  id,
  handleChange,
  shelf,
}) {
  const mapFloors = () => {
    return shelf.floors.map((e, index) => (
      <Grid item xs={6} key={index}>
        <Floor shelf={shelf} handleOpen={handleOpen} floor={e} />
      </Grid>
    ));
  };

  return (
    <Accordion
      sx={{
        borderRadius: "8px",
        marginBottom: "4%",
      }}
      expanded={expanded === id}
      onChange={handleChange(id)}
    >
      <AccordionSummary
        sx={{
          display: "flex",

          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          sx={{
            width: "10%",
            margin: 0,
            marginRight: "1%",
          }}
        >
          {shelf.name}
        </Typography>
        <Typography
          sx={{
            width: "50%",

            marginRight: "1%",
          }}
        >
          Kích thước tầng: {shelf.width}m x {shelf.length}m x {shelf.height}m
        </Typography>
        <Typography
          sx={{
            width: "30%",
          }}
        >
          Số tầng tầng: {shelf.floors.length}
        </Typography>
        <Button
          style={{
            height: "32px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          color="error"
          variant="outlined"
        >
          Xóa
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={2}
          sx={{
            width: "98%",
          }}
        >
          {mapFloors()}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
