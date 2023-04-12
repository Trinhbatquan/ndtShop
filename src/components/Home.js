import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineUser, AiFillPlusCircle, AiFillSetting } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo/logo3.png";
import { AiOutlineAlignRight, AiOutlineSearch } from "react-icons/ai";
import { FaProductHunt, FaRegSun} from "react-icons/fa";
import { GiEgyptianBird } from "react-icons/gi";
import { MdPayments, MdDarkMode} from "react-icons/md";
import { BsBell, BsFillFileEarmarkPostFill } from "react-icons/bs";
import { isActiveStyle, isNotActiveStyle } from "../utils/style";
import {Footer} from '../components'

const Home = () => {
  const [isNavbar, setIsNavbar] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isLight, setIsLight] = useState(true); 

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleNavbar = () => {
    setIsNavbar(!isNavbar);
    setIsContent(!isContent);
  };

  const handleDarkMode = () => {
    setIsLight(false);
  }

  const handleLightMode = () => {
    setIsLight(true);
  }

  return (
    <div className= {`w-full h-auto ${isLight ? "bg-primary" : 'bg-black'}`}>
      <div className= {`w-full h-16 flex items-center shadow-lg backdrop-blur-md ${isLight ? "bg-primary" : 'bg-black'}`}>
        <div className="h-full w-1/6 bg-blue-800 flex items-center justify-between">
          <NavLink to="/home">
            <img
              src={logo}
              alt="None"
              className="h-10 w-10 ml-8 text-lg text-primary rounded-full"
            />
          </NavLink>
          <AiOutlineAlignRight
            onClick={handleNavbar}
            className="mr-8 text-md h-8 w-8 text-primary opacity-80 cursor-pointer"
          />
        </div>

        <div className= {`h-full flex-auto flex items-center justify-around px-4 ${isLight ? 'bg-white' : 'bg-textColor'}`}>
          <div className="w-3/5 h-auto flex items-center justify-start focus:outline-blue-600 rounded-md">
            <label htmlFor="inputSearch">
              <AiOutlineSearch className="text-textColor text-xl mr-1 cursor-pointer ml-2" />
            </label>
            <input
              id="inputSearch"
              className="text-textColor bg-transparent outline-none text-md w-full p-2"
              placeholder="Search here..."
            />
          </div>
          <div className="flex  flex-1 items-center justify-between ml-80 relative">
            <BsBell className="text-xl text-blue-400 shadow-sm mr-6 hover:text-blue-800 cursor-pointer" />
            {
              isLight &&(
                <FaRegSun 
                  onClick={handleDarkMode}
                  className="text-xl text-blue-400 shadow-sm mr-6 hover:text-blue-800 cursor-pointer" />
              )
            }
            {
              isLight || (
                <MdDarkMode 
                  onClick={handleLightMode}
                  className="text-xl text-blue-400 shadow-sm mr-6 hover:text-blue-800 cursor-pointer" />
              )
            }
            <div className="flex items-center justify-between">
              <img
                src={logo}
                alt="None"
                className="h-10 w-10 rounded-full shadow-md cursor-pointer border
            border-gray-200 mr-2"
              />
              <div
                className="flex flex-col cursor-pointer"
                onClick={handleMenu}
              >
                <div className="min-w-[150px] flex flex-col items-start justify-center">
                  <span className="text-md text-headingColor font-semibold w-full">
                    ShopName
                  </span>
                  <span className="flex items-center justify-start w-full">
                    <p className="text-xs text-lighttextGray font-semibold">
                      Member Premium
                    </p>
                    <GiEgyptianBird className="text-xs text-yellow-500 ml-1" />
                  </span>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isMenu && (
                <motion.div
                  className="absolute z-10 p-3 top-16 right-0 w-150 gap-4 bg-card shadow-md rounded-md backdrop-blur-sm text-center cursor-pointer z-10"
                  initial={{ opacity: 0, translateY: -30 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -30 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <NavLink to="/home/profile" onClick={() => setIsMenu(!isMenu)}>
                    <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                      Profile
                    </p>
                  </NavLink>
                  <hr />
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Sign Out
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div 
        className="w-full flex"
        >
        {/* navbar */}
        <AnimatePresence>
          {isNavbar && (
            <motion.div
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -50 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-420 min-h-[420px] w-1/6 bg-blue-800 flex flex-col items-start justify-center pt-8"
            >
              <span className="text-lg text-white font-semibold ml-8">
                MAIN
              </span>
              <hr className="text-white w-full opacity-30" />
              <div className="mt-6 flex flex-col items-start justify-center w-full h-auto ml-8">
                <NavLink
                  to="/home/product"
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <FaProductHunt className="mr-2" />
                  Product
                </NavLink>
                <NavLink
                  to="/home/post"
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <BsFillFileEarmarkPostFill className="mr-2" />
                  Post
                </NavLink>
                <NavLink
                  to="/home/news"
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <MdPayments className="mr-2" />
                  News
                </NavLink>
              </div>
              <hr className="text-white w-full opacity-30" />
              <div className="mt-6 flex flex-col items-start justify-center w-full h-auto ml-8">
                <NavLink
                  to="/home/other"
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <AiFillPlusCircle className="mr-2" />
                  Others
                </NavLink>
                <NavLink
                  to="/home/setting"
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <AiFillSetting className="mr-2" />
                  Setting
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isContent && (
            <motion.div
              initial={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: 50 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 flex-1 h-auto w-5/6 overflow-y-scroll"
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      <hr className="font-semibold text-red-700 mt-10"/>

    </div>
  );
};

export default Home;
