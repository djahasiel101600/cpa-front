import PageRouter from "./pages/Routes/routes";
import { useEffect, useState } from "react";
import { UseGetEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const [isAuth, setIsAuth] = useState<boolean | undefined>();
  const { error } = UseGetEndpointData("verify-token/", isAuth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuth(error?.response?.status === undefined ? true : false);
      console.log(isAuth)
    }
  }, [error, isAuth]);

  const handleLogin = () => {
    const { error } = UseGetEndpointData("verify-token/", isAuth);
    setIsAuth(error?.response?.status === undefined ? true : false);
  };

  return <PageRouter isAuth={isAuth} onLogin={handleLogin} />;
}
export default App;
