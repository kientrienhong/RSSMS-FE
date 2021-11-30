import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router";

export default function ProtectTemplate({ children, Component, permission }) {
  const user = JSON.parse(localStorage.getItem("user"));
  let valid = false;
  permission.forEach((e) => {
    if (e === user.roleName) {
      valid = true;
    }
  });

  if (valid === true) {
    return <Component />;
  } else {
    return <Navigate to="/404" />;
  }
}
