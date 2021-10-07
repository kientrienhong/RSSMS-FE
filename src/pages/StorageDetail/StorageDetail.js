import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { getStorageDetail, getArea } from "../../apis/Apis";
import { useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import StorageDetailView from "./StorageDetailView";
import AreaList from "./AreaList";
function StorageDetail({ showLoading, hideLoading, showSnackbar }) {
  const [storage, setStorage] = useState({});
  const [listArea, setListArea] = useState([]);
  const { storageId } = useParams();
  useEffect((e) => {
    const getData = async () => {
      let storageTemp = await getStorageDetail(storageId);
      setStorage(storageTemp.data);
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData();
        let listAreaTemp = await getArea(parseInt(storageId));
        setListArea(listAreaTemp.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <StorageDetailView storage={storage} />
      <AreaList
        listArea={listArea}
        setListArea={setListArea}
        storageId={storageId}
      />
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

export default connect(null, mapDispatchToProps)(StorageDetail);
