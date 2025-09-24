import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "@/pages/Auth/Form/Login";
import ProtectedRoute from "@/components/core/ProtectedRoute";
import PageNotFound from "../../pages/NotFound/PageNotFound";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home";
import IAR from "../../pages/IAR";
import PO from "../../pages/PO";
import Logout from "../../pages/Auth/Form/Logout";
import Profile from "../../pages/Auth/Profile";

import { default as RCI } from "@/pages/RCI";
import IARForm from "../../pages/IAR/Forms/IARForm";
import IARDataSingleView from "../../pages/IAR/DataView/IARDataSingleView";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageRouter({ isAuth }: { isAuth: boolean | undefined }) {
  console.log("IsAuth from routes.tsx", isAuth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route element={<Navigate to={"/"} replace />} />
        ) : (
          <Route
            path="login"
            element={
              <LoginForm onLogin={() => localStorage.getItem("authToken")} />
            }
          />
        )}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rci" element={<RCI />} />
            <Route path="iar" element={<IAR />} />
            <Route
              path="iar-form"
              element={<IARForm onSuccess={(stat) => console.log(stat)} />}
            />
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
