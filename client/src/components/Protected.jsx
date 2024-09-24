import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ childern }) => {
  const { name } = useSelector((state) => state.auth);
  const isAuthenticated = !!name;
  return isAuthenticated ? childern : <Navigate to="/login" />;
};

export default Protected;
