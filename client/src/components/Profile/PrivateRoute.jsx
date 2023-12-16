import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// The main difference between Navigate and useNavigate is that the first one is a component from react-router-dom and the second one is a hook.
// The autlet renders the child route's element, if there is one. If the private route exists it will render all its children.

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
