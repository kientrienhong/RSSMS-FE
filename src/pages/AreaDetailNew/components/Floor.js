import React from "react";
import {Box, Button, Typography, Grid} from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import * as action from "../../../redux/action/action";
import {getDetailFloor} from "../../../apis/Apis";
import {connect} from "react-redux";

function Floor({
  floor,
  handleOpen,
  shelf,
  openStoredOrderModal,
  setUpCurrentFloor,
  area,
  storage,
  placingProducts,
  showLoading,
  hideLoading,
  setDetailFloor,
  userState,
}) {
  return (
    <Grid>
      <Box
        sx={{
          borderWidth: "2px",
          borderRadius: "4px",
          borderStyle: "solid",
          padding: "2%",
          borderColor: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgressWithLabel value={floor.usage} />
          <Typography
            color="black"
            variant="h2"
            sx={{textAlign: "center", marginTop: "16px"}}
          >
            {floor.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {userState.roleName !== "Admin" ? (
            <Button
              style={{
                height: "32px",
                paddingLeft: "16px",
                paddingRight: "16px",
                width: "100%",
                marginBottom: "8%",
              }}
              color="primary"
              variant="contained"
              onClick={() => {
                setUpCurrentFloor({
                  ...floor,
                  shelfName: shelf.name,
                  areaName: area.name,
                  storageName: storage.name,
                  storageId: storage.id,
                  typeShelf: shelf.type,
                });
                openStoredOrderModal();
              }}
            >
              L??u tr??? ?????
            </Button>
          ) : (
            <></>
          )}
          <Button
            style={{
              height: "32px",
              paddingLeft: "16px",
              paddingRight: "16px",
              width: "100%",
            }}
            color="success"
            variant="contained"
            onClick={async () => {
              try {
                showLoading();
                const response = await getDetailFloor(
                  floor.id,
                  userState.idToken
                );
                setDetailFloor(response.data);
                handleOpen(shelf);
              } catch (error) {
                console.log(error);
                console.log(error.response);
              } finally {
                hideLoading();
              }
            }}
          >
            Xem th??m
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  placingProducts: state.order.placingProducts,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    openStoredOrderModal: (isView) =>
      dispatch(action.openStoredOrderModal(isView)),
    setUpCurrentFloor: (floor) => dispatch(action.setUpCurrentFloor(floor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Floor);
