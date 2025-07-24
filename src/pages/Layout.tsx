import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="w-screen">
        <header className="flex justify-center">{<Header />}</header>
        <main className="p-8">{<Outlet />}</main>
        <footer>{<Footer />}</footer>
      </div>
    </>
  );
}

export default Layout;
