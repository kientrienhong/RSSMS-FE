import React from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import {formatCurrency} from "../utils/FormatCurrency";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";

const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    zIndex: "99999999999999999999 !important",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function OrderDetail({
  choosenProduct,
  duration,
  order,
  isOrder,
}) {
  const buildTotalPrice = () => {
    let months = Math.ceil(duration / 30);
    let sum = 0;
    choosenProduct?.product?.forEach((e) => {
      sum += e.price * e.quantity * months;
    });
    choosenProduct?.accessory?.forEach((e) => {
      sum += e.price * e.quantity;
    });
    choosenProduct?.services?.forEach((e) => {
      sum += e.price * e.quantity;
    });

    if (order?.additionalFee) {
      sum += order?.additionalFee;
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4%",
          marginBottom: "4%",
        }}
      >
        <Typography variant="h2" color="black" style={{marginBottom: "3%"}}>
          Tổng đơn
        </Typography>
        <Typography variant="h2" color="primary" style={{marginBottom: "3%"}}>
          {formatCurrency(sum, " đ")}
        </Typography>
      </Box>
    );
  };

  const buildTotalEachPartPrice = (value) => {
    let total = choosenProduct[value].reduce(
      (a, b) => {
        return {
          price: a.price * a.quantity + b.price * b.quantity,
          quantity: 1,
        };
      },
      {price: 0, quantity: 1}
    );

    let totalNum =
      isNaN(parseInt(total?.price)) === true ? 0 : parseInt(total?.price);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marinBottom: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{marginBottom: "3%", marginRight: "8%"}}
          >
            Tổng
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{marginBottom: "3%"}}>
          {formatCurrency(parseInt(totalNum), "đ")}
        </Typography>
      </Box>
    );
  };

  const mapListDetailOthers = (listProduct) => {
    return listProduct.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{marginBottom: "3%", marginRight: "8%"}}
          >
            {e?.name}
          </Typography>
          <Typography variant="h3" color="primary" style={{marginBottom: "3%"}}>
            X {e?.quantity}
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{marginBottom: "3%"}}>
          {formatCurrency(e?.price * e?.quantity, "đ")}
        </Typography>
      </Box>
    ));
  };

  const buildAdditionPrice = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "4%",
        }}
      >
        <Typography
          variant="h2"
          style={{marginBottom: "3%", marginRight: "8%"}}
        >
          Chi phí thêm
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "1%",
          }}
        >
          <Typography variant="h2" style={{marginBottom: "3%", width: "50%"}}>
            {order?.additionalFeeDescription}
          </Typography>
          <Typography
            variant="h2"
            color="primary"
            style={{marginBottom: "3%", width: "50%", textAlign: "right"}}
          >
            {formatCurrency(order?.additionalFee, "đ")}
          </Typography>
        </Box>
      </Box>
    );
  };

  const buildTotalProduct = (value) => {
    let months = Math.ceil(duration / 30);
    let total = choosenProduct[value].reduce(
      (a, b) => {
        return {
          price: a.price * a.quantity + b.price * b.quantity * months,
          quantity: 1,
        };
      },
      {price: 0, quantity: 1}
    );
    let totalNum =
      isNaN(parseInt(total?.price)) === true ? 0 : parseInt(total?.price);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marinBottom: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{marginBottom: "3%", marginRight: "8%"}}
          >
            Tổng
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{marginBottom: "3%"}}>
          {formatCurrency(parseInt(totalNum), "đ")}
        </Typography>
      </Box>
    );
  };

  const mapListDetailProduct = (listProduct) => {
    let months = Math.ceil(duration / 30);

    return listProduct.map((e) => {
      if (isOrder) {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                style={{marginBottom: "3%", marginRight: "8%"}}
              >
                {e.name}
              </Typography>
              <Typography
                variant="h3"
                color="primary"
                style={{marginBottom: "3%"}}
              >
                X {e.quantity}
              </Typography>
            </Box>
            <Typography
              variant="h2"
              color="primary"
              style={{marginBottom: "3%"}}
            >
              {formatCurrency(e?.price * e?.quantity * months, "đ")}
            </Typography>
          </Box>
        );
      } else {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <HtmlTooltip
              title={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginRight: "8px",
                    }}
                  >
                    <img
                      src={e?.imageUrl}
                      width="80"
                      height="80"
                      alt={e.name}
                    />
                  </Box>
                  <Box>
                    <Typography color="black" variant="h5">
                      Mô tả đồ khách hàng sẽ gửi
                    </Typography>
                    <p>{e.note}</p>
                  </Box>
                </Box>
              }
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h2"
                  style={{marginBottom: "3%", marginRight: "8%"}}
                >
                  {e.name}
                  <img
                    src="/img/info.png"
                    alt="edit"
                    style={{
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                      marginLeft: "8px",
                    }}
                  />
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  style={{marginBottom: "3%"}}
                >
                  X {e.quantity}
                </Typography>
              </Box>
            </HtmlTooltip>
            <Typography
              variant="h2"
              color="primary"
              style={{marginBottom: "3%"}}
            >
              {formatCurrency(e?.price * e?.quantity * months, "đ")}
            </Typography>
          </Box>
        );
      }
    });
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{marginBottom: "3%"}}>
          Dịch vụ
        </Typography>
        <Typography variant="h2" style={{marginBottom: "3%"}}>
          Giá tiền
        </Typography>
      </Box>
      <Divider />
      {mapListDetailProduct(choosenProduct.product)}
      <Divider />
      {buildTotalProduct("product")}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "4%",
        }}
      >
        <Typography variant="h2" style={{marginBottom: "3%"}}>
          Phụ kiện
        </Typography>
        <Typography variant="h2" style={{marginBottom: "3%"}}>
          Giá tiền
        </Typography>
      </Box>
      <Divider />
      {mapListDetailOthers(choosenProduct.accessory)}
      <Divider />
      {buildTotalEachPartPrice("accessory")}
      {order?.additionalFee ? buildAdditionPrice() : <></>}
      {buildTotalPrice()}
    </Box>
  );
}
