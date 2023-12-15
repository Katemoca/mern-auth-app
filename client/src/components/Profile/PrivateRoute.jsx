import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

//! VIDEO = 3:38:08 TO CONTINUE - There's an error as the conditional logic is not working, when the localstorage is cleared the profile photo should dissapear but it doesn't at the moment it keeps rendering according to the amount of users who have signed up.
