import React, { useRef } from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Modal,
  FormControl,
  Typography,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListStorage from "./components/ListStorage";
let inputFile;
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const buildInputFileImage = () => {
  <Box sx={{ width: "90%" }}>
    <img src="" />
  </Box>;
};

const buildModal = (storage, open, handleClose) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        ></Box>
        <Box></Box>
        <Box
          sx={{
            width: "35%",
            margin: "2% auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default function Storages() {
  inputFile = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [storage, setStorage] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {buildModal(storage, open, handleClose)}
      <Box
        sx={{
          marginLeft: "2%",
          marginBottom: "1%",
          display: "flex",
          height: "45px",
          flexDirection: "row",
        }}
      >
        <TextField
          sx={{
            width: "80%",
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
        <Box sx={{ width: "2%" }} />
        <Button
          style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          Create storage
        </Button>
      </Box>
      <ListStorage />
    </Box>
  );
}
