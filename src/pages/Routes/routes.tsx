import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "@/pages/Auth/Form/Login";
import ProtectedRoute from "@/components/core/ProtectedRoute";
import PageNotFound from "../NotFound/PageNotFound";
import Layout from "../Layout";
import Home from "../Home";
import IAR from "../IAR";
import PO from "../PO";
import Logout from "../Auth/Form/Logout";
import Profile from "../Auth/Profile";

function PageRouter({
  isAuth,
  onLogin,
}: {
  isAuth: boolean;
  onLogin: (token: string) => void;
}) {
  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route element={<Navigate to={"/"} replace />} />
        ) : (
          <Route path="login" element={<LoginForm onLogin={onLogin} />} />
        )}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route index element={<IAR />} />
            <Route index element={<PO />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Navigate to={"/"} replace />} />
            <Route path="logout" element={<Logout dialogState={true} />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
