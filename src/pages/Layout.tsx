import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { Outlet } from "react-router-dom"



function Layout() {
    return (
        <>
            <div className="w-screen">
                <header>{<Header/>}</header>
                <main className="p-8">{<Outlet/>}</main>
                <footer>{<Footer/>}</footer>
            </div>
        </>
    )
}

export default Layout;