import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { name } = useSelector((state) => state.auth);
  const isAuthenticated = !!name;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Protected;
