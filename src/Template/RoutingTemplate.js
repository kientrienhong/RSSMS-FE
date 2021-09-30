import React from "react";
import { Route } from "react-router-dom";

const RoutingLayout = (props) => {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};

export default function RoutingTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <RoutingLayout>
          <Component {...propsComponent} />
        </RoutingLayout>
      )}
    />
  );
}
