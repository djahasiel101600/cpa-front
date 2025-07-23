import type { IARShape } from "./types/core-types";
import PageRouter from "./pages/routes";
import { UseEndpointData } from "./services/helpers/GetEndpoints";
import { useEffect, useState } from "react";

function App() {
  const { data: iarData = [] } = UseEndpointData<IARShape>(
    "/iar/inspection-acceptance-report/"
  );

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuth(authToken !== null);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuth(true);
  }

  return <PageRouter isAuth={isAuth} iarData={iarData} onLogin={handleLogin} />;
}
export default App;
