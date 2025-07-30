import PageRouter from "./pages/Routes/routes";
import { useEffect, useState } from "react";
import { UseGetEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { error, data, isLoading } = UseGetEndpointData("verify-token/", true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!isLoading) {
      error?.message === "Network Error" && setIsAuth(false);
      data.length > 0 && setIsAuth(true);
      console.log(error?.message);
    }
  }, [error, data, isLoading]);

  return <PageRouter isAuth={isAuth} />;
}
export default App;
