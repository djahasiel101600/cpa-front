import PageRouter from "./pages/Routes/routes";
import { useEffect, useState } from "react";
import { UseGetEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { error, data } = UseGetEndpointData("verify-token/", isAuth);
  const token = localStorage.getItem("authToken");

  if (error) {
    console.log(error.message)
  } else {
    console.log(data)
  }

  return <PageRouter isAuth={isAuth} />;
}
export default App;
