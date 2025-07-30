import { Navigate, Outlet } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const ProtectedRoute = () => {
  const [errorName, setErrorName] = useState<string | undefined>();
  const { error, isLoading } = UseGetEndpointData("verify-token/", true);

  useEffect(() => {
    setErrorName(error?.name ? "AxiosError" : undefined);
    console.log("Status code: ", error?.name);
  }, [error, isLoading]);

  if (!isLoading) {
    return errorName !== "AxiosError" ? (
      <Outlet />
    ) : (
      <Navigate to={"/login/"} />
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <AiOutlineLoading className="text-8xl animate-spin" />
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;
