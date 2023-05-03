import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GetDataToContext } from "../../../context/ProviderContext";
import { setPostId } from './../../../context/reducer';
import {FaInfoCircle} from 'react-icons/fa'

const PostCard = ({ image, text, id, content, nameProduct, priceProduct, rateProduct }) => {
  const [isLove, setIsLove] = useState(false);

  const { state, dispatch } = GetDataToContext();

  let priceArr = []
  if (priceProduct) {

    priceProduct.forEach((price, index) => {
      priceArr.push(price?.price)
    })
  }

 


  const handleLove = () => {
    setIsLove(true);
  };

  const handleNotLove = () => {
    setIsLove(false);
  };

  const handleProduct = (id) => {
    dispatch(setPostId(id));
  };

  return (
    <div
      className="flex flex-col bg-slate-200 px-2 pt-2 pb-2 cursor-pointer mb-2 mr-3 hover:bg-slate-300 rounded-md backdrop-blur-sm shadow-sm"
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
        className="px-1 text-headingColor font-semibold mt-2"
        style={{ lineHeight: "20px", fontSize: "11px" }}
      >
        Shop: {text.length > 46 ? `${text.slice(0, 46)}...` : text}
      </span>

      <span
        className="px-1 text-headingColor font-semibold"
        style={{ lineHeight: "16px", fontSize: "10px" }}
      >
        {content.length > 55 ? `${content.slice(0, 55)}...` : content}
      </span>

      <div className="w-full flex flex-row items-center justify-between mx-1 mt-1">
        <div 
            // style={{ fontSize: "10px", lineHeight: "10px" }}
        >
          <span
            className="text-textColor opacity-100 mr-2 block"
            style={{ fontSize: "10px", lineHeight: "16px" }}
          >
          {nameProduct.length > 65 ? `${nameProduct.slice(0, 65)}...` : nameProduct}
            {/* {nameProduct} */}
          </span>
        </div>
        {isLove || (
          <AiOutlineHeart
            style={{ fontSize: "16px" }}
            className="text-red-600 mr-4"
            onClick={handleLove}
          />
        )}
        {isLove && (
          <AiFillHeart
            style={{ fontSize: "16px" }}
            className="text-red-600 mr-4"
            onClick={handleNotLove}
          />
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-between px-1 pt-1">
        <span
          style={{ fontSize: "10px" }}
          className="text-red-600 font-semibold"
        >
          {
            `${Math.min(...priceArr)}đ-${Math.max(...priceArr)}đ`
          }
        </span>
        <span style={{ fontSize: "10px" }} className="text-red-600">
          Rate: {rateProduct}/5
        </span>
      </div>
    </div>
  );
};

export default PostCard;
