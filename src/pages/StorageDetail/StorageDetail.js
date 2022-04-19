import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import {getStorageDetail, getArea} from "../../apis/Apis";
import {useParams} from "react-router-dom";
import {Box} from "@material-ui/core";
import StorageDetailView from "./StorageDetailView";
import AreaList from "./AreaList";
import {ErrorHandle} from "../../utils/ErrorHandle";
function StorageDetail({
  showLoading,
  hideLoading,
  userState,
  showSnackbar,
  handleExtendSession,
}) {
  const [storage, setStorage] = useState({});
  const [listArea, setListArea] = useState([]);
  const {storageId} = useParams();
  useEffect(() => {
    const getData = async () => {
      let storageTemp = await getStorageDetail(storageId, userState.idToken);
      setStorage(storageTemp.data);
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData();
        let listAreaTemp = await getArea(storageId, userState.idToken);
        setListArea(listAreaTemp.data.data);
      } catch (error) {
        ErrorHandle.handle(error, showSnackbar, handleExtendSession);

        console.log(error?.response);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "91vh",
        alignItems: "center",
      }}
    >
      <StorageDetailView storage={storage} />
      <AreaList
        listArea={listArea}
        setListArea={setListArea}
        storageId={storage.id}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetail);
