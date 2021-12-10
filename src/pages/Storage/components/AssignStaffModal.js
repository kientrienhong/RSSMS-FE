import React from "react";
import { Box, Typography, Modal, Button } from "@material-ui/core";
import ListStaff from "./ListStaff";
import { STYLE_MODAL } from "../../../constant/style";
const styleModal = {
  ...STYLE_MODAL,
  width: "70%",
};

export default function AssignStaffModal({
  openAssignStaff,
  handleCloseAssignStaff,
  listShowStaffAssigned,
  addAssignStaff,
  removeAssignStaff,
  handleChangeSearchAssigned,
  listShowStaffUnAssigned,
  handleChangeSearchUnAssigned,
  error,
  onHandleAssignUser,
  listStaffAssigned,
  listStaffUnAssigned,
  storage,
}) {
  return (
    <Modal
      open={openAssignStaff}
      onClose={handleCloseAssignStaff}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "90%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "3%",
            }}
          >
            <ListStaff
              listStaff={listShowStaffAssigned}
              isAssigned={true}
              name="Staffs belong to this storage"
              addAssignStaff={addAssignStaff}
              removeAssignStaff={removeAssignStaff}
              onHandleSearch={handleChangeSearchAssigned}
            />
            <ListStaff
              listStaff={listShowStaffUnAssigned}
              isAssigned={false}
              name="Staffs are not assigned yet"
              addAssignStaff={addAssignStaff}
              removeAssignStaff={removeAssignStaff}
              onHandleSearch={handleChangeSearchUnAssigned}
            />
          </Box>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "red",
            }}
          >
            {error?.assignStaff?.message ? error?.assignStaff?.message : ""}
          </p>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginTop: "4%",
              }}
              color="primary"
              variant="contained"
              onClick={() =>
                onHandleAssignUser(
                  listStaffAssigned,
                  listStaffUnAssigned,
                  storage
                )
              }
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
