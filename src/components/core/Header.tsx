import { Input } from "../ui/input";
import { SiDwavesystems } from "react-icons/si";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AccountOptionShape } from "@/types/core-types";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";

const inboundLinks = [
  {
    address: "po",
    title: "Purchase Order",
  },
  {
    address: "iar",
    title: "Inspection & Acceptance Report",
  },
  {
    address: "letters",
    title: "Letters",
  },
  {
    address: "bankrecon",
    title: "Bank Recon.",
  },
  {
    address: "trial-balance",
    title: "Trial Balance",
  },
  {
    address: "liquidation-report",
    title: "Liquidation Report",
  },
];

export default function Header() {
  const { data } = UseGetEndpointData("user/", true);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(data);
  }, [data]);

  const navigate = useNavigate();
  const [selection, setSelection] = useState<AccountOptionShape>({
    option: "account-options",
  });
  useEffect(() => {
    if (selection.option === "logout") {
      navigate("/logout");
    } else if (selection.option === "profile") {
      navigate("/profile");
    }
  }, [selection]);
  return (
    <nav className="flex flex-col w-[70%]">
      <div className="flex justify-between items-center gap-2 px-8 py-4 w-full">
        <div className="flex cursor-pointer" onClick={() => navigate("/")}>
          <SiDwavesystems className="text-3xl" />
          <h2 className="text-3xl">
            <span className="font-bold">CP</span>SYS
          </h2>
        </div>
        <div className="grow flex border-r-2 border-l-2 items-center justify-between px-4">
          <div className="flex flex-col">
            <p className="text-sm">Hi {user?.username}</p>
            <h1 className="text-2xl font-medium">Welcome Back</h1>
          </div>
          <Input className="w-[60%]" placeholder="Search" />
        </div>
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="text-4xl" />
          <div>
            <h3 className="font-medium">{user?.email}</h3>
            <select
              value={selection.option}
              className="w-full focus:outline-0"
              onChange={(e) => {
                setSelection({
                  option: e.target.value,
                } as AccountOptionShape);
              }}
            >
              <option value="account-options">Account Options</option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem asChild className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink asChild>
              <Link to={"/"}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem asChild className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink asChild>
              <Link to={"rci"}>Report of Check Issued</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Inbound</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-flow-col grid-rows-3 w-[500px] gap-2">
                {inboundLinks.map((link, idx) => (
                  <li
                    key={idx}
                    className="font-medium text-[14px] hover:bg-gray-100 rounded-sm"
                  >
                    <NavigationMenuLink href={link.address}>
                      {link.title}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem asChild className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink asChild>
              <Link to={"#"}>Outbound</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </nav>
  );
}
