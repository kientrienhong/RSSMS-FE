import React from "react";
import {useNavigate} from "react-router-dom";

import {Box, Container, Typography} from "@material-ui/core";
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            Không tìm thấy trang
          </Typography>
          <Box sx={{textAlign: "center"}}>
            <img
              alt="Under development"
              src="/img/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
          <Typography
            align="center"
            color="primary"
            variant="h1"
            onClick={() => {
              const loggedInUser = localStorage.getItem("user");
              if (loggedInUser) {
                const foundUser = JSON.parse(loggedInUser);
                if (
                  foundUser.roleName === "Delivery Staff" ||
                  foundUser.roleName === "Customer"
                ) {
                  localStorage.removeItem("user");
                  navigate("/", {replace: true});
                } else {
                  navigate(-2);
                }
              } else {
                navigate("/", {replace: true});
              }
            }}
            sx={{
              cursor: "pointer",
              marginTop: "16px ",
            }}
          >
            Trở về trang trước
          </Typography>
        </Container>
      </Box>
    </>
  );
}
