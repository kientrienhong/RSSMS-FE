import React from "react";
import {
  Box,
  Typography,
  Divider,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import moment from "moment";

export default function ExportReceipt({currentOrder}) {
  const buildInformation = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography color="black" variant="h2">
          {title}
        </Typography>
        <p
          style={{
            fontSize: 20,
          }}
        >
          {value}
        </p>
      </Box>
    );
  };

  const mappingQuantityOrderDetail = () => {
    currentOrder.orderDetails.forEach((e) => {
      let quantity = 0;
      e.orderDetailServices.forEach((e1) => {
        if (e1.serviceId === e.serviceId) {
          quantity++;
        }
      });

      e.amount = quantity;
    });
  };

  const mapListExportDetail = () => {
    return currentOrder.orderDetails.map((e) => (
      <TableRow>
        <TableCell>{e.importCode}</TableCell>
        <TableCell>{e.serviceName}</TableCell>
        <TableCell>{e.amount}</TableCell>
        <TableCell>{e.importNote}</TableCell>
      </TableRow>
    ));
  };
  mappingQuantityOrderDetail();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography color="primary" variant="h2">
          Mã xuất kho
        </Typography>
        <p
          style={{
            fontSize: 20,
          }}
        >
          #{currentOrder.exportCode}
        </p>
      </Box>
      <Typography
        color="primary"
        variant="h2"
        sx={{
          marginBottom: "3%",
        }}
      >
        Thông tin kho
      </Typography>
      {buildInformation("Tên kho", currentOrder.storageName)}
      {buildInformation("Địa chỉ kho", currentOrder.storageAddress)}
      {buildInformation(
        "Ngày nhập kho",
        moment(new Date(currentOrder?.exportDay)).format("DD/MM/YYYY")
      )}

      {buildInformation("Người thủ kho", currentOrder.exportStaff)}
      <Typography
        color="primary"
        variant="h2"
        sx={{
          marginBottom: "3%",
        }}
      >
        Thông tin vận chuyển
      </Typography>
      {buildInformation("Mã đơn hàng", "#" + currentOrder.name)}
      {buildInformation("Tên khách hàng", currentOrder.customerName)}
      {buildInformation("Số điện thoại của khách", currentOrder.customerPhone)}
      {buildInformation("Người vận chuyển", currentOrder.exportDeliveryBy)}
      <Divider />
      <Divider />
      <Typography
        color="primary"
        variant="h2"
        sx={{
          marginTop: "2%",
        }}
      >
        Thông tin sản phẩm
      </Typography>
      <Table sx={{minWidth: 650, maxHeight: 500}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng</TableCell>

            <TableCell>Mô tả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mapListExportDetail()}</TableBody>
      </Table>
    </Box>
  );
}
