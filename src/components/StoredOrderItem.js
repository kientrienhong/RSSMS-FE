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
  Divider,
  Radio,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatCurrency } from "../utils/FormatCurrency";

export default function StoredOrderItem({
  expanded,
  id,
  handleChangeRadio,
  selectedValue,
  storedOrder,
  handleChange,
}) {
  const mapImage = (list) => {
    return list.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <img src={e.url} width="80" height="80" alt="imaged" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            paddingLeft: "2%",
          }}
        >
          <Typography
            color="black"
            variant="h3"
            style={{
              marginTop: "2%",
              textAlign: "left",
            }}
          >
            {e.name}
          </Typography>
          <p>{e.note}</p>
        </Box>
      </Box>
    ));
  };

  const mapAdditionService = (list) => {
    return list.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <img src={e.serviceUrl} width="80" height="80" alt="imaged" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            color="black"
            variant="h3"
            style={{
              marginTop: "2%",
              textAlign: "left",
              marginLeft: "2.5%",
            }}
          >
            {e.serviceName} x {e.amount}
          </Typography>
          <p>{formatCurrency(e.price, " đ")}</p>
        </Box>
      </Box>
    ));
  };

  let styleAccordition = {
    borderRadius: "8px",
    marginBottom: "4%",
    width: "100%",
  };

  styleAccordition = storedOrder.isPlaced
    ? {
        ...styleAccordition,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#04BFFE",
        boxShadow: "none",
      }
    : styleAccordition;

  return (
    <Accordion
      sx={styleAccordition}
      expanded={expanded === id}
      onChange={handleChange(id)}
    >
      <AccordionSummary
        sx={{
          display: "flex",

          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        {selectedValue ? (
          <Radio
            value={storedOrder.id}
            checked={selectedValue === storedOrder.id.toString()}
            name="radio-buttons"
            onChange={handleChangeRadio}
            inputProps={{ "aria-label": "B" }}
          />
        ) : (
          <></>
        )}

        <p
          style={{
            width: "20%",
            fontWeight: "bold",
            fontSize: "20px",
            margin: 0,
            padding: 0,
            marginRight: "1%",
            verticalAlign: "center",
          }}
          variant="h2"
        >
          {storedOrder.serviceName}
        </p>
        <p
          style={{
            width: "50%",
            fontWeight: "bold",
            verticalAlign: "center",
            fontSize: "20px",
            margin: 0,
            padding: 0,
          }}
          variant="h2"
        >
          Kích thước sản phẩm: {storedOrder?.width}m x{storedOrder?.length}m x{" "}
          {storedOrder?.height}m
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "2%",
          }}
        >
          <Typography
            sx={{
              margin: 0,
              marginBottom: "2%",
            }}
            variant="h3"
          >
            Hình ảnh đồ đạc
          </Typography>
          {mapImage(storedOrder.images)}
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "2%",
          }}
        >
          <Typography
            sx={{
              margin: 0,
              marginBottom: "2%",
            }}
            variant="h3"
          >
            Các dịch vụ đi kèm
          </Typography>
          {mapAdditionService(storedOrder.orderDetailServices)}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
