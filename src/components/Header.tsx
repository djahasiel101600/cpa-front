import { Link } from "react-router-dom";

export default function Header() {
  return (
  <nav className="flex justify-between items-center gap-2 px-8 py-4 ">
    <div className="text-5xl">SiteNAME</div>
    <div className="grow flex border-r-2 border-l-2">
      <div className="flex flex-col">
        <p className="text-sm">Hi David</p>
        <h1>Welcome Back</h1>
      </div>
    </div>
    <div>Account</div>
  </nav>
  );
}
