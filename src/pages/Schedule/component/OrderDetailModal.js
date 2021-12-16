import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { OrderDetail } from "../../Order/ViewOrder/components/OrderDetail";
import { STYLE_MODAL } from "../../../constant/style";
import { PRODUCT_TYPE } from "../../../constant/constant";

const styleModal = STYLE_MODAL;

export default function OrderDetailModal({ order, open, handleClose }) {
  const formatToChosenProduct = () => {
    let result = {
      product: [],
      services: [],
      accessory: [],
    };

    order?.orderDetails.forEach((e) => {
      let type = PRODUCT_TYPE[e.productType];
      result[type].push({
        name: e.productName,
        quantity: e.amount,
        price: e.price,
      });
    });

    return result;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        height: "50%",
        width: "86%",
      }}
    ></Modal>
  );
}
