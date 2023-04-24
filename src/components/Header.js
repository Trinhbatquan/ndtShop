import React, { useState } from "react";
import logo from "../assets/logo/logo3.png";

import { AiOutlineAlignRight, AiOutlineSearch } from "react-icons/ai";
import { BiMessageAltDetail } from "react-icons/bi";
import { GiEgyptianBird } from "react-icons/gi";
import { BsBell } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu= () => {
    setIsMenu(!isMenu);
  }

  return (
    <div className="w-full h-16 flex items-center shadow-lg backdrop-blur-md">
      <div className="h-full w-1/6 bg-blue-800 flex items-center justify-between">
        <NavLink to="/home">
          <img src={logo} alt="None" className="h-10 w-10 ml-8 text-lg text-primary rounded-full" />
        </NavLink>
        <AiOutlineAlignRight className="mr-8 text-md h-8 w-8 text-primary opacity-80 cursor-pointer" />
      </div>

      <div className="h-full flex-auto bg-white flex items-center justify-between px-4">
        <div className="p-4 w-3/5 h-auto flex items-center justify-start border focus:border-gray-400 rounded-md">
          <label htmlFor="inputSearch">
            <AiOutlineSearch className="text-textColor text-xl mr-1 cursor-pointer" />
          </label>
          <input
            id="inputSearch"
            className="text-textColor bg-transparent outline-none text-md w-full p-2"
            placeholder="Search here..."
          />
        </div>
        <div className="flex  flex-1 items-center justify-center ml-60 relative">
          {/* <BiMessageAltDetail className="text-xl  text-blue-400 mr-8 shadow-sm hover:text-blue-800 cursor-pointer" /> */}
          <BsBell className="text-xxl text-blue-400 mr-8 shadow-sm hover:text-blue-800 cursor-pointer" />
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="None"
              className="h-10 w-10 rounded-full shadow-md cursor-pointer border
            border-gray-200 mr-2"
            />
            <div className="flex flex-col cursor-pointer" onClick={handleMenu}>
              <span className="text-md text-headingColor font-semibold">
                UserName
              </span>
              <span className="flex items-center justify-center">
                <p className="text-xs text-lighttextGray font-semibold">
                  Premium
                </p>
                <GiEgyptianBird className="text-xs text-yellow-500" />
              </span>
            </div>
          </div>
          {isMenu && (
            <motion.div
              className="absolute z-10 p-3 top-16 right-0 w-150 gap-4 bg-card shadow-md rounded-md backdrop-blur-sm text-center cursor-pointer"
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -50 }}
            >
              <NavLink to="">
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  Profile
                </p>
              </NavLink>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Contact
              </p>
              <hr />
              <NavLink to="">
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  DashBoard
                </p>
              </NavLink>
              <hr />
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Sign Out
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
