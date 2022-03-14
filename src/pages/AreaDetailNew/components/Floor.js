import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
export default function Floor({ floor }) {
  return (
    <Grid>
      <Box
        sx={{
          borderWidth: "2px",
          borderRadius: "4px",
          borderStyle: "solid",
          padding: "1%",
          borderColor: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgressWithLabel value={floor.usage} />
          <Typography
            color="black"
            variant="h2"
            sx={{ textAlign: "center", marginTop: "16px" }}
          >
            {floor.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Button
            style={{
              height: "32px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
              width: "100%",
            }}
            color="primary"
            variant="contained"
            onClick={() => {}}
          >
            Lưu trữ đồ
          </Button>
          <Button
            style={{
              height: "32px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
              width: "100%",
            }}
            color="success"
            variant="contained"
            onClick={() => {}}
          >
            Xem thêm
          </Button>
          <Button
            style={{
              height: "32px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
              width: "100%",
            }}
            color="error"
            variant="contained"
            onClick={() => {}}
          >
            Xóa
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
