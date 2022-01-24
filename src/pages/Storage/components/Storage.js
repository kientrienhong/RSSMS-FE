import React from "react";
import { Card, Box, Typography, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
const styleIcon = {
  marginRight: "2%",
  marginTop: "2%",
};

const styleBoxTypo = {
  display: "flex",
  flexDirection: "row",
  marginTop: "2%",
  alignItems: "flex-end",
};
function Storage({
  storage,
  setCurrentId,
  handleConfirmOpen,
  setStorage,
  handleOpen,
  setUpCurrentStorage,
  showSnackbar,
  handleOpenAssignStaff,
  userState,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "280px",
        padding: "8px",
      }}
    >
      <img
        src={storage.images[0].url}
        alt="test"
        width="48%"
        height="96%"
        style={{ margin: "1%" }}
      />
      <Box
        sx={{
          marginBottom: "3%",
          margin: "1%",
          display: "flex",
          height: "100%",
          width: "50%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marinTop: "4%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              style={{ marginTop: "1%", marginLeft: "1%" }}
            >
              {storage.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "2%",
            }}
          >
            <img src="/img/location.png" alt="location" style={styleIcon} />
            {storage.address}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "2%",
            }}
          >
            <img src="/img/size.png" alt="size" style={styleIcon} />
            {storage.size}
          </Box>

          <Box sx={{ ...styleBoxTypo, marginTop: "2%" }}>
            <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
              Manager:
            </Typography>
            <Typography color="black" variant="body">
              {storage.managerName}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "2%",
                width: "100%",
              }}
              color="primary"
              variant="contained"
              onClick={() => {
                let sizes;
                if (storage.size) {
                  sizes = storage.size.split("x");
                  storage.width = sizes[0]
                    ?.trim()
                    .substring(0, sizes[0]?.trim().length - 1);
                  storage.length = sizes[1]
                    ?.trim()
                    .substring(0, sizes[1]?.trim().length - 1);
                  storage.height = sizes[2]
                    ?.trim()
                    .substring(0, sizes[2]?.trim().length - 1);
                }
                setStorage({
                  ...storage,
                  width: storage.width,
                  length: storage.length,
                  height: storage.height,
                });

                handleOpen(true);
              }}
            >
              Edit
            </Button>
          </Grid>
          {userState.roleName === "Manager" ? (
            <></>
          ) : (
            <Grid item xs={6}>
              <Button
                style={{
                  height: "45px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginRight: "2%",
                  width: "100%",
                }}
                color="error"
                variant="contained"
                onClick={() => {
                  setCurrentId(storage.id);
                  handleConfirmOpen();
                }}
              >
                Delete
              </Button>
            </Grid>
          )}

          <Grid item xs={6}>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "2%",
                width: "100%",
                background: "#8099FF",
              }}
              variant="contained"
              onClick={() => {
                // setCurrentId(storage.id);
                setStorage({
                  ...storage,
                });

                handleOpenAssignStaff();
              }}
            >
              Assign Staff
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              style={{
                height: "45px",
                width: "100%",
              }}
              color="success"
              onClick={() =>
                navigate("/app/storages/" + storage.id, { replace: false })
              }
              variant="contained"
            >
              See more
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  placingProducts: state.order.placingProducts,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUpCurrentStorage: (storage) =>
      dispatch(action.setUpCurrentStorage(storage)),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
