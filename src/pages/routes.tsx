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
        <Route index element={<Home />} />
        <Route path="iar-form" element={<ProtectedRoute isAuth={isAuth}><IARForm/></ProtectedRoute>} />
        <Route path="login" element={!isAuth ? <LoginForm onLogin={onLogin}/> : <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
