import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";
import {getProduct} from "../../../apis/Apis";
import {STYLE_MODAL} from "../../../constant/style";
import FormSelfStorage from "./FormSelfStorage";
import {connect} from "react-redux";
import * as action from "../../../redux/action/action";
const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};
function SelfStorageModal({
  currentSpace,
  setCurrentSpace,
  handleClose,
  open,
  isEdit,
  areaId,
  page,
  getData,
  isView,
  searchName,
  userState,
  showLoading,
  hideLoading,
}) {
  const [listStorage, setListStorage] = useState([]);
  useEffect(() => {
    const process = async () => {
      try {
        showLoading();
        let listStorageTemp = await getProduct(userState.idToken, 4);
        setListStorage(listStorageTemp.data);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    if (open) process();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FormSelfStorage
            isEdit={isEdit}
            currentSpace={currentSpace}
            setCurrentSpace={setCurrentSpace}
            searchName={searchName}
            getData={getData}
            page={page}
            areaId={areaId}
            isView={isView}
            handleClose={handleClose}
            listStorage={listStorage}
          />
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
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),

    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfStorageModal);
