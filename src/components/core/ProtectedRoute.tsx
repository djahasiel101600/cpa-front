import { Navigate, Outlet } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [statusCode, setStatusCode] = useState<number | null>();
  const { error } = UseGetEndpointData("verify-token/", true);
  useEffect(() => {
    setStatusCode(error?.response?.status);
    console.log(statusCode);
  }, [error]);
  return statusCode === undefined ? <Outlet /> : <Navigate to={"/login/"} />;
};

export default ProtectedRoute;
