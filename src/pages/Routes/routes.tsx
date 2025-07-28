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

import { default as RCI } from "@/pages/RCI";
import IARForm from "../IAR/Forms/IARForm";
import IARDataSingleView from "../IAR/DataView/IARDataSingleView";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageRouter({
  isAuth,
}: {
  isAuth: boolean | undefined;
}) {
  console.log('IsAuth', isAuth)
  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route element={<Navigate to={"/"} replace />} />
        ) : (
          <Route path="login" element={"Login"} />
        )}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rci" element={<RCI />} />
            <Route path="iar" element={<IAR />} />
            <Route path="iar-form" element={<IARForm onSuccess={(stat) => console.log(stat)} />} />
            <Route path="iar/:id" element={<IARDataSingleView />} />
            <Route path="po" element={<PO />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Navigate to={"/"} replace />} />
            <Route path="logout" element={<Logout dialogState={true} />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
