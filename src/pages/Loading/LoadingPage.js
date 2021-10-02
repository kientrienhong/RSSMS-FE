import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./loadingPage.css";
import { connect } from "react-redux";
function LoadingPage({ loading }) {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader">
        <CircularProgress sx={{ width: "80", height: "80" }} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ loading: state.application.loading });

export default connect(mapStateToProps, null)(LoadingPage);
