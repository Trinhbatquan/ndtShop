import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion'
import { deleteNew } from "../../../api";
import { GetDataToContext } from "../../../context/ProviderContext";
import { setAlertType } from "../../../context/reducer";

const NewsCart = ({ image, text, id }) => {
  const navigate = useNavigate();
  const {state, dispatch} = GetDataToContext()

  const [overlay, setOverlay] = useState(false);

  const handleProduct = (id) => {
    navigate(`/home/news/${id}`);
  };

  const handleNotification = () => {
    setOverlay(true);
  };

  const handleDeleteNew = (id) => {
    deleteNew(id).then((data) => {
      if (data) {
        dispatch(setAlertType("success"))
      }
    })
    setTimeout(() => {
      dispatchEvent(setAlertType(null))
    }, 3000)
  }

  return (
    <div
      className="flex flex-col bg-slate-200 px-1 pt-2 pb-1 cursor-pointer mb-2 mr-3 hover:bg-slate-300 relative"
      style={{ width: "calc(20% - 10px" }}
    >
      <div
        className=""
        style={{
          backgroundImage: `url(${image})`,
          paddingTop: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "2px",
          borderTopRightRadius: "2px",
        }}
        onClick={() => handleProduct(id)}
      ></div>

      <span
        className="h-24 px-1 mt-2 text-headingColor font-semibold"
        style={{ lineHeight: "19px", fontSize: "11px" }}
      >
        {text.length > 60 ? `${text.slice(0, 60)}...` : text}
      </span>

      <AiFillDelete
        className="absolute bottom-1 left-1 text-red-700 text-xl"
        onClick={() => handleNotification()}
      />

      <AnimatePresence>

          {overlay && (
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3, delay: 0.2}}
              className="absolute top-0 left-0 right-0 bottom-0 bg-green-200 flex justify-center px-2 shadow-md flex-col text-center text-xs">
              <p className="font-semibold text-xs mb-3">Do you want to delete it?</p>
              <div className="flex items-center justify-around">
                <motion.button 
                  whileTap={{scale: 0.85}}
                  onClick={() => handleDeleteNew(id)}
                  className="outline-none rounded-sm shadow-sm backdrop-blur-sm px-2 py-1 bg-blue-500 text-white font-semibold text-xs" type="button" name="yes">
                  Yes
                </motion.button>
                <motion.button 
                  whileTap={{scale: 0.85}}
                  onClick={() => setOverlay(false)}
                  className="outline-none rounded-sm shadow-sm backdrop-blur-sm px-2 py-1 bg-red-600 text-black font-semibold text-xs" type="button" name="no">
                  No
                </motion.button>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default NewsCart;
