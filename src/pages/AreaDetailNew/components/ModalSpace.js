import React from "react";
import {
  Box,
  Modal,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Shelf from "./Shelf";
import FormHandy from "./FormHandy";
import FormUnwieldy from "./FormUnwieldy";
import {TYPE_SHELF} from "../../../constant/constant";

import {STYLE_MODAL} from "../../../constant/style";
const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

export default function ModalSpace({
  currentSpace,
  open,
  handleClose,
  isEdit,
  areaId,
  setCurrentSpace,
  page,
  getData,
  searchName,
  isHandy,
  setIsHandy,
  isView,
}) {
  const handleChangeRadioButton = (event) => {
    if (event.target.value === "0") {
      setIsHandy(true);
      setCurrentSpace({
        ...currentSpace,
        type: TYPE_SHELF["Hanldy"],
      });
    } else {
      setIsHandy(false);
      setCurrentSpace({
        ...currentSpace,
        type: TYPE_SHELF["Unweildy"],
      });
    }
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
          ...styleModal,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Loại</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="row-radio-buttons-group"
            value={currentSpace?.type}
            onChange={handleChangeRadioButton}
          >
            <FormControlLabel value={0} control={<Radio />} label="Kệ" />
            <FormControlLabel value={1} control={<Radio />} label="Diện tích" />
          </RadioGroup>
        </FormControl>
        {isHandy === true ? (
          <FormHandy
            isEdit={isEdit}
            currentSpace={currentSpace}
            setCurrentSpace={setCurrentSpace}
            getData={getData}
            page={page}
            areaId={areaId}
            searchName={searchName}
            handleClose={handleClose}
            isView={isView}
          />
        ) : (
          <FormUnwieldy
            isEdit={isEdit}
            currentSpace={currentSpace}
            setCurrentSpace={setCurrentSpace}
            getData={getData}
            page={page}
            areaId={areaId}
            searchName={searchName}
            handleClose={handleClose}
            isView={isView}
          />
        )}
      </Box>
    </Modal>
  );
}
