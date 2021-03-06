import React, {useState, useEffect} from "react";
import {Box} from "@material-ui/core";
import SectionProduct from "./components/SectionProduct";
import ProductModal from "./components/ProductModal";
import {LIST_PRODUCT_MANAGE_TYPE} from "../../constant/constant";
import {getProduct, deleteProduct} from "../../apis/Apis";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import {useForm} from "react-hook-form";

import ConfirmModal from "../../components/ConfirmModal";
import {ErrorHandle} from "../../utils/ErrorHandle";
function Products({
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  handleExtendSession,
}) {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();

  const [isEdit, setIsEdit] = useState(false);
  const [typeProduct, setTypeProduct] = useState(-1);
  const [currentProduct, setCurrentProduct] = useState({
    images: [{id: null, url: null}],
  });
  const [listProduct, setListProduct] = useState([]);
  const handleOpen = (isEdit, index) => {
    setIsEdit(isEdit);
    setOpen(true);
    setTypeProduct(index);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEdit(isEdit);
    setTypeProduct(-1);
    reset();
    setCurrentProduct({
      images: [{id: null, url: null}],
    });
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const getData = async () => {
    let listProductTemp = await getProduct(undefined, userState.idToken);
    setListProduct(listProductTemp.data);
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData();
        hideLoading();
      } catch (error) {
        ErrorHandle.handle(error, showSnackbar, handleExtendSession);

        console.log(error.response);
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id, userState.idToken);
      setCurrentProduct({
        images: [{id: null, url: null}],
      });
      await getData();
      showSnackbar("success", "X??a d???ch v??? th??nh c??ng!");
    } catch (error) {
      if (error?.response?.status === 404) {
        setListProduct([]);
        showSnackbar("success", "X??a d???ch v??? th??nh c??ng!");
      } else {
        throw error;
      }
    }
  };

  const buildListSection = () =>
    LIST_PRODUCT_MANAGE_TYPE.map((e, index) => (
      <SectionProduct
        handleOpen={handleOpen}
        setCurrentProduct={setCurrentProduct}
        name={e}
        handleOpenConfirm={handleOpenConfirm}
        setTypeProduct={setTypeProduct}
        index={index}
        listProduct={listProduct ? listProduct[index.toString()] : []}
      />
    ));

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "auto",
        py: 3,
      }}
    >
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onHandleYes={handleDeleteProduct}
        id={currentProduct.id}
        showLoading={showLoading}
        hideLoading={hideLoading}
        showSnackbar={showSnackbar}
        msg="X??a d???ch v??? th??nh c??ng"
      />
      <ProductModal
        handleClose={handleClose}
        open={open}
        typeProduct={typeProduct}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        isEdit={isEdit}
        getData={getData}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
      />

      {buildListSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
