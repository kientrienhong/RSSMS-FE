import React from "react";
import { Box, Modal, Button, Typography, Checkbox } from "@material-ui/core";
import { useNavigate } from "react-router";
import * as action from "../redux/action/action";
import { connect } from "react-redux";
function ListPositionStored({ currentOrder, setUpCurrentViewOrderId }) {
  const navigate = useNavigate();

  const mapList = currentOrder.orderDetails
    .filter((e) => e.productType === 2)
    .map((e) => {
      return (
        <Box key={e.id}>
          <Typography
            color="black"
            variant="h4"
            onClick={() => {
              setUpCurrentViewOrderId(currentOrder.id);
              navigate(
                `/app/storages/${currentOrder?.storageId}/areas/${e?.boxDetails?.areaId}`,
                {
                  replace: true,
                }
              );
            }}
            sx={{
              marginBottom: "16px",
              display: "inline-block",
              color: "blue",
              cursor: "pointer",
            }}
          >
            {currentOrder?.storageName} / {e?.boxDetails?.areaName} /
            {e.boxDetails?.shelfName}
          </Typography>
        </Box>
      );
    });

  return (
    <Box>
      <Typography
        color="black"
        variant="h2"
        sx={{
          marginBottom: "16px",
        }}
      >
        Position stored item in order
      </Typography>
      {mapList}
    </Box>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUpCurrentViewOrderId: (orderId) =>
      dispatch(action.setUpCurrentViewOrderId(orderId)),
  };
};

export default connect(null, mapDispatchToProps)(ListPositionStored);
