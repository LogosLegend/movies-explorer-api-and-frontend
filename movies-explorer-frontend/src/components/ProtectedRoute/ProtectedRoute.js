import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {

  return (
    props.jwtExist ? (props.loggedIn && <Component {...props} />) : <Navigate to="/" replace/>
  )}

export default ProtectedRouteElement;