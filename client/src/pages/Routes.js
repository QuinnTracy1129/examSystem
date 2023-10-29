import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./notFound";
import NotExisting from "./notExisting";

import ADMINISTRATOR from "./platforms/administrator/access";
import MODERATOR from "./platforms/moderator/access";
import CANDIDATE from "./platforms/candidate/access";

//global
import { useSelector } from "react-redux";

export default function Routes() {
  const { role } = useSelector(({ auth }) => auth);

  const handleRoutes = () => {
    const collection = {
      ADMINISTRATOR,
      MODERATOR,
      CANDIDATE,
    };

    const routes = collection[role] || [];

    return routes.map(({ path, component, children, props }, x) => {
      const handleRoute = (key, path, Component = NotExisting, props) => (
        <Route
          key={key}
          exact
          path={path}
          component={routeProps => <Component {...routeProps} {...props} />}
        />
      );

      if (children)
        return children.map((child, y) =>
          handleRoute(
            `route-${x}-${y}`,
            `${path}${child.path}`,
            child.component,
            child.props
          )
        );

      return handleRoute(`route-${x}`, path, component, props);
    });
  };

  return (
    <Switch>
      {handleRoutes()}

      <Route component={NotFound} />
    </Switch>
  );
}
