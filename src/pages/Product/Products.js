import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import SectionProduct from "./components/SectionProduct";
import ProductModal from "./components/ProductModal";
import { LIST_PRODUCT_MANAGE_TYPE } from "../../constant/constant";
import { getProduct, deleteProduct } from "../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import ConfirmModal from "../../components/ConfirmModal";
function Products({ showLoading, hideLoading, showSnackbar }) {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [typeProduct, setTypeProduct] = useState(-1);
  const [currentProduct, setCurrentProduct] = useState({
    images: [{ id: null, url: null }],
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
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const getData = async () => {
    let listProductTemp = await getProduct();
    setListProduct(listProductTemp.data);
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData();
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    await getData();
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
        msg="Delete product success"
      />
      <ProductModal
        handleClose={handleClose}
        open={open}
        typeProduct={typeProduct}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        isEdit={isEdit}
        getData={getData}
      />
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
      </Box>
      {buildListSection()}
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

export default connect(null, mapDispatchToProps)(Products);
