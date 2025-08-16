import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const protect = localStorage.getItem("admin"); // returns "true" or null
  return protect ? children : <Navigate to="/admin/login" />;
}

export default Protected;
