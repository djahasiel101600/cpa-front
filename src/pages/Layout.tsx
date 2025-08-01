import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <header className="flex justify-center">{<Header />}</header>
        <div className="flex items-center justify-center">
          <Toaster />
        </div>
        <main className="p-8">{<Outlet />}</main>
        <footer>{<Footer />}</footer>
      </div>
    </>
  );
}

export default Layout;
