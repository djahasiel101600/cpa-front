import IARForm from "./forms/IARForm";
import LoginForm from "./forms/LoginForm";
import { DataTable } from "./components/table/data-table";

import { columnsIar } from "./components/table/columns-types/columns-iar";
import type { IARShape } from "./types/core-types";

import { UseEndpointData } from "./services/helpers/GetEndpoints";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

interface Props {
  isAuth: boolean;
  children: ReactNode;
}

function ProtectedRoute({ isAuth, children }: Props) {
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const { data: iarData = [], error } = UseEndpointData<IARShape>(
    "/iar/inspection-acceptance-report/"
  );
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (error === "Unauthorized") {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/iar-form/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <IARForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/iar/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <DataTable columns={columnsIar} data={iarData} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
