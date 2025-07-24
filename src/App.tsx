import PageRouter from "./pages/Routes/routes";
import { useEffect, useState } from "react";
import { UseGetEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const { error } = UseGetEndpointData("verify-token/", isAuth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuth(error?.response?.status === 200);
    }
  }, [error, isAuth]);

  const handleLogin = () => {
    // const { error } = UseGetEndpointData("verify-token");
    // setIsAuth(error?.response?.status !== 401);
    console.log("logged in");
  };

  return <PageRouter isAuth={isAuth} onLogin={handleLogin} />;
}
export default App;
