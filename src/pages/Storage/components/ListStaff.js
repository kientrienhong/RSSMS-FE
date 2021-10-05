import React from "react";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import RowStaff from "./RowStaff";
export default function ListStaff({
  listStaff,
  name,
  isAssigned,
  addAssignStaff,
  removeAssignStaff,
}) {
  const mapListToView = (listStaff, isAssigned) => {
    return listStaff.map((e) => (
      <RowStaff
        key={e.id}
        isAssigned={isAssigned}
        staff={e}
        addAssignStaff={addAssignStaff}
        removeAssignStaff={removeAssignStaff}
      />
    ));
  };

  const buildAreaStaffList = (listStaff, name, isAssigned) => {
    return (
      <Box
        sx={{
          width: "350px",
          display: "flex",
          marginRight: "20px",
          flexDirection: "column",
          justifiedContent: "flex-start",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginLeft: "2.5%" }}
        >
          {name}({listStaff.length})
        </Typography>
        <Box
          sx={{
            flexDirection: "column",
            marginTop: "16px",
            height: "400px",
            border: "solid 1px #000",
            padding: "8px",
          }}
        >
          <TextField
            sx={{
              width: "100%",
            }}
            InputProps={{
              style: { height: "45px", backgroundColor: "white" },
              startAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "16px",
            }}
          >
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Typography color="black" variant="h3">
                Name
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Typography color="black" variant="h3">
                Role
              </Typography>
            </Box>
            <Box
              sx={{
                width: "20%",
              }}
            >
              <Typography color="black" variant="h3">
                Action
              </Typography>
            </Box>
          </Box>
          {mapListToView(listStaff, isAssigned)}
        </Box>
      </Box>
    );
  };

  return <>{buildAreaStaffList(listStaff, name, isAssigned)}</>;
}
