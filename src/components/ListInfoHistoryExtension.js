import React from "react";
import { Box, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
export default function ListInfoHistoryExtension({ list, currentOrder }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: "16px",
        }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, maxHeight: 500 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Mã yêu cầu</TableCell>
                <TableCell>Ngày kết thúc cũ</TableCell>
                <TableCell>Ngày kết thúc mới</TableCell>
                <TableCell>
                  ({currentOrder.type === 0 ? "Số tháng" : "Số ngày"})
                </TableCell>
                <TableCell>Ngày thanh toán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row) => {
                let oldReturnDate = new Date(row.oldReturnDate);
                let returnDate = new Date(row.returnDate);
                let paidDate = new Date(row.paidDate);
                var differenceInTime =
                  returnDate.getTime() - oldReturnDate.getTime();

                // To calculate the no. of days between two dates
                var difference = differenceInTime / (1000 * 3600 * 24);
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.requestId}
                    </TableCell>
                    <TableCell>
                      {moment(new Date(row.oldReturnDate)).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(new Date(row.returnDate)).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{difference}</TableCell>
                    <TableCell>
                      {row.paidDate === null
                        ? "Chưa thanh toán"
                        : moment(new Date(row.paidDate)).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
