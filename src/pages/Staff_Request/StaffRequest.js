import React, {useEffect, useState} from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Card,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListRequest from "./component/ListRequest";
import * as action from "../../redux/action/action";

import {connect} from "react-redux";
import {getStaffRequest} from "../../apis/Apis";
import {ErrorHandle} from "../../utils/ErrorHandle";
function StaffRequest({
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  handleExtendSession,
}) {
  const [listRequest, setListRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({});
  const [page, setPage] = useState(1);
  const handleOpen = () => {
    setOpen(true);
  };

  const getData = async (name, page, size) => {
    try {
      showLoading();
      const list = await getStaffRequest(
        name,
        page,
        size,
        0,
        userState.idToken
      );
      setListRequest(list.data.data);
      setTotalRequest(list.data.metadata.total);
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);

      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, [page]);

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, []);

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
            style: {height: "45px", backgroundColor: "white"},
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{width: "2%"}} />
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{marginLeft: "2%", marginRight: "2%"}}
      >
        {listRequest.length > 0 ? (
          <ListRequest
            setRequest={setRequest}
            handleOpen={handleOpen}
            listRequest={listRequest}
            page={page}
            setPage={setPage}
            totalRequest={totalRequest}
            getData={getData}
          />
        ) : (
          <Typography
            color="black"
            variant="h5"
            style={{
              textAlign: "center",
              margin: "2% 0",
            }}
          >
            Kh??ng t??m y??u c???u n??o
          </Typography>
        )}
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
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffRequest);
