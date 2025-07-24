import { Navigate, Outlet } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [statusCode, setStatusCode] = useState<number | null>();
  const { error } = UseGetEndpointData("verify-token/", true);
  useEffect(() => {
    setStatusCode(error?.response?.status);
  }, [error]);
  return statusCode !== 401 ? <Outlet /> : <Navigate to={"/login/"} />;
};

export default ProtectedRoute;
