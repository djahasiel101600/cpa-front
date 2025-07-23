import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IARForm from "@/forms/IARForm";
import LoginForm from "@/forms/LoginForm";
import { DataTable } from "@/components/table/data-table";
import Header from "@/components/Header";
import type { IARShape } from "@/types/core-types";
import { columnsIar } from "@/components/table/columns-types/columns-iar";

function PageRouter({
  isAuth,
  iarData,
}: {
  isAuth: boolean;
  iarData: IARShape[];
}) {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={isAuth ? <Header /> : <Navigate to="/" replace />}
          />
          <Route path="/login/" element={<LoginForm />} />
          <Route
            path="/iar-form/"
            element={isAuth ? <IARForm /> : <Navigate to={"/login/"} replace />}
          />
          <Route
            path="/iar/"
            element={
              isAuth && <DataTable columns={columnsIar} data={iarData} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default PageRouter;
