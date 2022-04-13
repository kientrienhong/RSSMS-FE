import React from "react";
import {
  Button,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Floor from "./Floor";
import {LIST_SPACE_TYPE} from "../../../constant/constant";
import {connect} from "react-redux";

function Shelf({
  handleOpen,
  id,
  shelf,
  area,
  storage,
  handleOpenSpace,
  handleOpenSelfStorage,
  handleOpenConfirm,
  setDetailFloor,
  userState,
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "40%",
            justifyContent: "flex-end",
          }}
        >
          {userState.roleName !== "Admin" ? (
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
          ) : (
            <></>
          )}
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
          {userState.roleName !== "Admin" ? (
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
          ) : (
            <></>
          )}
        </Box>
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

const mapStateToProps = (state) => ({
  userState: state.information.user,
});
export default connect(mapStateToProps, null)(Shelf);
