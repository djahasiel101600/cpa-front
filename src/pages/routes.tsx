import {
  BrowserRouter,
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
import Home from "./home";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageNotFound from "./PageNotFound";

function PageRouter({
  isAuth,
  iarData,
  onLogin
}: {
  isAuth: boolean;
  iarData: IARShape[];
  onLogin: (token: string) => void
},) {
  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? <Route path="iar-form" element={<IARForm/>} /> : <Route path="login" element={<LoginForm onLogin={onLogin}/> } />}
        <Route element={<ProtectedRoute/>}>
          <Route path="iar-form" element={<IARForm/>} />
          <Route index element={<Home />} />
          <Route path="iar-data" element={<DataTable columns={columnsIar} data={iarData} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
