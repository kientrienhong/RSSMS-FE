import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Card,
  Radio,
  Grid,
} from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";
import { connect } from "react-redux";
import { getListStorage, assignOrder } from "../../../apis/Apis";

import * as action from "../../../redux/action/action";
function AssignOrderModal({
  open,
  handleClose,
  showLoading,
  hideLoading,
  showSnackbar,
  currentId,
  userState,
  changeIsLoadOrder,
}) {
  const [listStorage, setListStorage] = useState([]);
  const styleIcon = {
    marginRight: "2%",
    marginTop: "2%",
  };
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleAssignStorage = async () => {
    if (selectedValue === "") {
      setError("Please product to place");
      return;
    }

    try {
      showLoading();
      await assignOrder(currentId, parseInt(selectedValue), userState.idToken);
      showSnackbar("success", "Assign success");
      changeIsLoadOrder();
      handleClose();
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (open === false) {
      return;
    }
    const process = async () => {
      try {
        showLoading();
        const listStorageTemp = await getListStorage(
          "",
          1,
          -1,
          userState.idToken
        );
        setListStorage(listStorageTemp.data.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        hideLoading();
      }
    };

    process();
  }, [open]);

  const buildRadioSelect = () => {
    return listStorage?.map((e) => {
      let eventTemp = {
        target: {
          value: e.id.toString(),
        },
      };

      return (
        <Card
          sx={{
            display: "flex",
            flexDirection: "Column",
            width: "30%",
            marginRight: "2%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "8%",
            cursor: "pointer",
          }}
          key={e.id}
          onClick={() => handleChange(eventTemp)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
            }}
          >
            <img
              src={e?.images[0]?.url}
              alt={e.name}
              width={160}
              height={160}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography
                color="black"
                variant="h2"
                style={{
                  marginTop: "2%",
                  marginLeft: "2.5%",
                }}
              >
                {e.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <img src="/img/location.png" alt="location" style={styleIcon} />
                {e.address}
              </Box>
            </Box>
          </Box>
          <Radio
            value={e.id}
            checked={selectedValue === e.id.toString()}
            name="radio-buttons"
            onChange={handleChange}
            inputProps={{ "aria-label": "B" }}
          />
        </Card>
      );
    });
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
          ...STYLE_MODAL,
          width: "80%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "4%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "95%",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Grid container spacing={2}>
            {buildRadioSelect()}
          </Grid>
        </Box>
        {error?.length > 0 ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : null}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: "32px",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "4%",
            }}
            onClick={handleAssignStorage}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={() => handleClose()}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    changeIsLoadOrder: () => dispatch(action.changeIsLoadOrder()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignOrderModal);
