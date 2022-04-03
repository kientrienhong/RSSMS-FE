import React, {useState} from "react";
import StoredOrderItem from "./StoredOrderItem";
import {Grid, Typography, Box} from "@material-ui/core";
import {
  AREA_TYPE,
  BOX_TYPE,
  SERVICE_TYPE,
  ACCESSSORY_TYPE,
} from "../constant/constant";

export default function ItemTab({listOrderDetail}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const mapListOrderDetail = () =>
    listOrderDetail
      .filter((e) => e.serviceType === AREA_TYPE || e.serviceType === BOX_TYPE)
      .map((e, index) => (
        <Grid item xs={6} key={index}>
          {e.storageName ? (
            <Typography
              color="black"
              variant="h2"
              style={{
                textAlign: "left",
                marginBottom: "2.5%",
              }}
            >
              Vị trí món đồ:
              <p
                style={{
                  fontWeight: "normal",
                  display: "inline-block",
                  marginLeft: "2%",
                }}
              >
                {e.storageName} - {e.areaName} - {e.floorName}
              </p>
            </Typography>
          ) : (
            <></>
          )}

          <StoredOrderItem
            expanded={expanded}
            id={index}
            storedOrder={e}
            handleChange={handleChange}
          />
        </Grid>
      ));

  const mapListSperate = () =>
    listOrderDetail
      .filter(
        (e) =>
          e.serviceType === ACCESSSORY_TYPE || e.serviceType === SERVICE_TYPE
      )
      .map((e) => e.orderDetailServices[0])
      .map((e, index) => (
        <Grid item xs={3} key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img src={e.serviceUrl} width="64" height="64" alt="imaged" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "8px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {e.serviceName} x {e.amount}
              </p>
            </Box>
          </Box>
        </Grid>
      ));

  return (
    <div
      style={{
        width: "98%",
        marginTop: "2%",
      }}
    >
      <Typography
        color="primary"
        variant="h2"
        style={{
          textAlign: "left",
          marginBottom: "2%",
        }}
      >
        Sản phẩm lưu kho:
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListOrderDetail()}
      </Grid>
      <Typography
        color="primary"
        variant="h2"
        style={{
          textAlign: "left",
          marginBottom: "8px",
        }}
      >
        Phụ kiện riêng:
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListSperate()}
      </Grid>
    </div>
  );
}
