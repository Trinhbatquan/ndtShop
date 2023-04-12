import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { setProductId } from "../../../context/reducer";
import { GetDataToContext } from "../../../context/ProviderContext";

const ProductCard = ({ text, id, image, rate, count, price }) => {
  const [isLove, setIsLove] = useState(false);

  const { state, dispatch } = GetDataToContext();

  let priceArr = [];
  if (price) {
    price.forEach((price, index) => {
      priceArr.push(price?.price);
    });
  }

  const handleLove = () => {
    setIsLove(true);
  };

  const handleNotLove = () => {
    setIsLove(false);
  };

  const handleProduct = (id) => {
    //api dựa theo id
    dispatch(setProductId(id));
  };

  return (
    <div
      className="flex flex-col px-3 py-3  mb-8 rounded-md shadow-lg backdrop-blur-md hover:bg-primary cursor-pointer mx-auto border border-gray-200 bg-slate-200"
      style={{ width: "30%", minWidth: "30%" }}
    >
      <div
        className=""
        style={{
          backgroundImage: `url(${image})`,
          paddingTop: "75%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "2px",
          borderTopRightRadius: "2px",
        }}
        onClick={() => handleProduct(id)}
      ></div>

      <span
        className="h-10 px-1 text-headingColor font-semibold text-sm mt-3 flex items-center"
        style={{ lineHeight: "20px" }}
      >
        {text.length > 40 ? `${text.slice(0, 40)}...` : text}
      </span>

      <div className="w-full flex flex-row items-center justify-between mx-1">
        <div>
          <span className="text-red-600 font-semibold text-xs">
            {`${Math.min(...priceArr)}đ-${Math.max(...priceArr)}đ`}
          </span>
        </div>
        {isLove || (
          <AiOutlineHeart
            className="text-red-600 mr-4 text-xs"
            onClick={handleLove}
          />
        )}
        {isLove && (
          <AiFillHeart
            className="text-red-600 mr-4 text-xs"
            onClick={handleNotLove}
          />
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-between mx-1">
        <span className="text-textColor text-xs">Đã bán {count}</span>
        <span className="text-xs text-headingColor mr-4">Rate: {rate}</span>
      </div>
    </div>
  );
};

export default ProductCard;
