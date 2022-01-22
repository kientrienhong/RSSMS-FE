import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Modal,
  Typography,
  Card,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListRequest from "./component/ListRequest";
import { useForm } from "react-hook-form";
import * as action from "../../redux/action/action";
import { connect } from "react-redux";

function StaffRequest({ showLoading, hideLoading, showSnackbar, userState }) {
  const [listRequest, setListRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [request, setRequest] = useState({});
  const [page, setPage] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async (name, page, size) => {
    try {
      showLoading();
      //   let list = await getListUser(name, page, size, userState.idToken);
      // setListRequest(list.data.data);
      // setTotalRequest(list.data.metadata.total);
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      <Box
        sx={{
          marginLeft: "2%",
          marginBottom: "1%",
          display: "flex",
          height: "45px",
          flexDirection: "row",
        }}
      >
        <TextField
          hiddenLabel
          sx={{
            width: "80%",
          }}
          onChange={(e) => {}}
          InputProps={{
            style: { height: "45px", backgroundColor: "white" },
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ width: "2%" }} />
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <ListRequest
          setRequest={setRequest}
          handleOpen={handleOpen}
          listRequest={listRequest}
          page={page}
          setPage={page}
          totalRequest={totalRequest}
          getData={getData}
        />
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffRequest);
