import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoCall } from "react-icons/io5";

function Footer() {
  return (
    <div className="bg-gray-200 p-8">
      <div className="w-full flex flex-col justify-between gap-10">
        <div className="flex justify-center gap-4 text-xl font-bold px-8">
          <div className="flex-1 flex flex-col items-center justify-center pl-8">
            <div>
              <h3 className="">Menu</h3>
              <ul className="flex flex-col text-sm font-medium">
                <li className="hover:underline">Home</li>
                <li className="hover:underline">About Us</li>
                <li className="hover:underline">FAQ</li>
              </ul>
            </div>
          </div>
          <div className="grow flex flex-col text-center border-gray-600/5 border-x-2 py-4 px-8">
            <h1>Colossians 3:23-24 (NIV)</h1>
            <div className="text-lg font-normal text-gray-500">
              <p className="">
              Whatever you do, work at it with all your heart, as working for the Lord,<br /> not for human masters,
              since you know that you will receive an inheritance from the Lord as a reward. <br />It is the Lord Christ you are serving.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center pr-8">
            <div className="pl-8">
              <h1>Contact us</h1>
              <ul className="flex flex-col font-normal text-sm text-gray-500 gap-2">
                <li>Purok-1, Santa Ana, Tubay, Agusan del Norte, 8606</li>
                <li className="hover:underline hover:text-black">
                  djahasiel@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <hr className="border-gray-600/5 border-1 w-full mx-8" />
          <div className="flex justify-center text-2xl gap-4 mt-4">
            <FaFacebook className="cursor-pointer" />
            <SiGmail className="cursor-pointer" />
            <IoCall className="cursor-pointer" />
          </div>
          <h3>Copyright 2025. All Rights Reserved</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
