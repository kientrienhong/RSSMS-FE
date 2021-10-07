import React from "react";
import { Card, Box, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const styleIcon = {
  marginRight: "2%",
  marginTop: "2%",
};

const styleBoxTypo = {
  display: "flex",
  flexDirection: "row",
  marginTop: "2%",
  alignItems: "flex-end",
};
export default function Storage({
  storage,
  setCurrentId,
  handleConfirmOpen,
  setStorage,
  handleOpen,
}) {
  const statusList = [{}, { color: "green", name: "Available" }];
  const typeList = ["Self-Storage", "Door-to-door"];
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "280px",
        padding: "8px",
      }}
    >
      <img
        src={storage.images[0].url}
        alt="test"
        width="48%"
        height="96%"
        style={{ margin: "1%" }}
      />
      <Box
        sx={{
          marginBottom: "3%",
          margin: "1%",
          display: "flex",
          height: "100%",
          width: "50%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marinTop: "2%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              style={{ marginTop: "1%", marginLeft: "1%" }}
            >
              {storage.name}
            </Typography>
            <Typography
              color={statusList[storage.status].color}
              variant="h2"
              style={{ marginTop: "1%", marginRight: "1%" }}
            >
              {statusList[storage.status].name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <img src="/img/location.png" alt="location" style={styleIcon} />
            {storage.address}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <img src="/img/size.png" alt="size" style={styleIcon} />
            {storage.size}
          </Box>

          <Box sx={styleBoxTypo}>
            <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
              Type:
            </Typography>
            <Typography color="black" variant="body">
              {typeList[storage.type]}
            </Typography>
          </Box>
          {storage.type === "Self-storage" ? (
            <Box sx={styleBoxTypo}>
              <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
                Remaining Time:
              </Typography>
              <Typography color="black" variant="body">
                {storage.remainingTime}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
          <Box sx={styleBoxTypo}>
            <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
              Manager:
            </Typography>
            <Typography color="black" variant="body">
              {storage.managerName}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
            }}
            color="primary"
            variant="contained"
            onClick={() => {
              let sizes;
              if (storage.size) {
                sizes = storage.size.split("x");
                console.log(sizes);
                storage.width = sizes[0]
                  ?.trim()
                  .substring(0, sizes[0]?.trim().length - 1);
                storage.length = sizes[1]
                  ?.trim()
                  .substring(0, sizes[1]?.trim().length - 1);
                storage.height = sizes[2]
                  ?.trim()
                  .substring(0, sizes[2]?.trim().length - 1);
              }
              setStorage({
                ...storage,
                width: storage.width,
                length: storage.length,
                height: storage.height,
              });

              handleOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
            }}
            color="error"
            variant="contained"
            onClick={() => {
              setCurrentId(storage.id);
              handleConfirmOpen();
            }}
          >
            Delete
          </Button>
          <Button
            style={{
              height: "45px",
              width: "auto",
            }}
            color="success"
            onClick={() =>
              navigate("/app/storages/" + storage.id, { replace: false })
            }
            variant="contained"
          >
            See more
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
