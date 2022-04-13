import React from "react";
import {Box, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {TYPE_AREA} from "../../constant/constant";
import {connect} from "react-redux";

function RowArea({
  area,
  setCurrentArea,
  handleOpen,
  handleOpenConfirm,
  storageId,
  setIsEdit,
  userState,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
        marginBottom: "8px",
      }}
    >
      <Box sx={{width: "80%", display: "flex", flexDirection: "column"}}>
        <Typography color="black" variant="h3">
          {area.name}
          <Typography
            color="black"
            variant="body"
            sx={{
              marginLeft: "1%",
            }}
          >
            ({Object.keys(TYPE_AREA)[area.type]})
          </Typography>
        </Typography>
        <p>{area.description}</p>
      </Box>
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <img
          src="/img/edit.png"
          alt="edit"
          style={{marginRight: "8%", cursor: "pointer"}}
          onClick={() => {
            handleOpen(true);
            setCurrentArea(area);
            setIsEdit(true);
          }}
        />
        {userState.roleName !== "Admin" ? (
          <img
            src="/img/delete.png"
            alt="edit"
            style={{
              marginRight: userState.roleName !== "Admin" ? "8%" : "0",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentArea(area);
              handleOpenConfirm();
            }}
          />
        ) : (
          <></>
        )}

        <img
          src="/img/info.png"
          alt="edit"
          style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/app/storages/" + storageId + "/areas/" + area.id, {
              replace: false,
            });
          }}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

export default connect(mapStateToProps, null)(RowArea);
