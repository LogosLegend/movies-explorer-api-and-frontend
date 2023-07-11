import { Navigate } from "react-router-dom";

const LimitedRouteElement = ({ element: Component, ...props  }) => {

  return (
    props.jwtExist ? <Navigate to="/" replace/> : <Component {...props} />
  )}

export default LimitedRouteElement;