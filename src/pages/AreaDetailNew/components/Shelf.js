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
import {LIST_SPACE_TYPE} from "../../../constant/constant";

export default function Shelf({
  handleOpen,
  expanded,
  id,
  handleChange,
  shelf,
  area,
  storage,
  handleOpenSpace,
  handleOpenSelfStorage,
  handleOpenConfirm,
  setDetailFloor,
}) {
  const mapFloors = () => {
    return shelf.floors.map((e, index) => (
      <Grid item xs={6} key={index}>
        <Floor
          storage={storage}
          area={area}
          shelf={shelf}
          handleOpen={handleOpen}
          floor={e}
          setDetailFloor={setDetailFloor}
        />
      </Grid>
    ));
  };

  return (
    <Accordion
      sx={{
        borderRadius: "8px",
        marginBottom: "4%",
        width: "100%",
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
          height: "64px",
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          sx={{
            width: "25%",
            margin: 0,
            marginRight: "1%",
          }}
        >
          <Typography
            sx={{
              margin: 0,
              fontWeight: "bold",
              display: "inline-block",
              color: LIST_SPACE_TYPE[shelf.type].color,
            }}
          >
            {LIST_SPACE_TYPE[shelf.type].name}
          </Typography>

          {`  |  ${shelf.name}`}
        </Typography>
        <Typography
          sx={{
            width: "30%",

            marginRight: "1%",
          }}
        >
          Kích thước tầng: {shelf?.floors[0]?.width}m x{" "}
          {shelf?.floors[0]?.length}m x {shelf?.floors[0]?.height}m
        </Typography>

        <Button
          style={{
            height: "32px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginRight: "1%",
          }}
          onClick={() => {
            if (area.type === 1) {
              handleOpenSpace(shelf, true, false);
            } else {
              handleOpenSelfStorage(shelf, true, false);
            }
          }}
          color="primary"
          variant="contained"
        >
          Chỉnh sửa
        </Button>
        <Button
          style={{
            height: "32px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginRight: "1%",
          }}
          onClick={() => {
            if (area.type === 1) {
              handleOpenSpace(shelf, true, true);
            } else {
              handleOpenSelfStorage(shelf, true, true);
            }
          }}
          color="success"
          variant="contained"
        >
          Xem thêm
        </Button>
        <Button
          onClick={() => {
            handleOpenConfirm(shelf);
          }}
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
