import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Card,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getStorageDetail } from "../../apis/Apis";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import AreaDetailView from "./components/AreaDetailView";
import AreaUsage from "./components/AreaUsage";
import DetailBox from "./components/DetailBox";

function AreaDetail(props) {
  const listShelf = [
    {
      id: 1,
      name: "Shelf - 1",
      type: "handy",
      amountHeight: 3,
      amountWidth: 3,
      boxSize: "S",
      boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      id: 2,
      name: "Shelf - 2",
      type: "handy",
      amountHeight: 3,
      amountWidth: 4,
      boxSize: "M",
      boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      id: 3,
      name: "Shelf - 3",
      type: "unwieldy",
      amountHeight: 1,
      amountWidth: 1,
      boxSize: "M",
      boxes: [{}],
    },
    {
      id: 4,
      name: "Shelf - 4",
      type: "handy",
      amountHeight: 4,
      amountWidth: 4,
      boxSize: "L",
      boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      id: 5,
      name: "Shelf - 5",
      type: "handy",
      amountHeight: 4,
      amountWidth: 3,
      boxSize: "XL",
      boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      id: 6,
      name: "Shelf - 6",
      type: "unwieldy",
      amountHeight: 1,
      amountWidth: 1,
      boxSize: "XL",
      boxes: [{}],
    },
  ];

  const { storageId, areaId } = useParams();
  const [storage, setStorage] = useState({});

  const { showLoading, hideLoading, showSnackbar } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        let storageTemp = await getStorageDetail(parseInt(storageId));
        setStorage(storageTemp.data);
      } catch (e) {}
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData();
      } catch (error) {
        console.log(error);
      } finally {
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
          sx={{
            width: "80%",
          }}
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
        <Button
          style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
          color="primary"
          variant="contained"
        >
          Create shelf
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <AreaDetailView storage={storage} listShelf={listShelf} />
        <Box
          sx={{
            margin: "2%",
            display: "flex",
            flexDirection: "column",
            width: "25%",
          }}
        >
          <AreaUsage />
          <DetailBox />
        </Box>
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(null, mapDispatchToProps)(AreaDetail);
