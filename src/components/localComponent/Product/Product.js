import React, { useState, useEffect} from "react";
import { ButtonCustom, ProductCard } from "../../../components";
import { AnimatePresence, motion } from "framer-motion";
import "./main.css";
import { GetDataToContext } from "../../../context/ProviderContext";
import { FiDelete } from "react-icons/fi";
import { setAlertType, setAllProductsContext, setProductId } from "../../../context/reducer";
import { getAllProducts, handleProduct } from '../../../api/index';
import Loading from '../../../components/loadingToast/Loading'
import {AiOutlineHeart, AiOutlineClear, AiFillHeart} from 'react-icons/ai'
import Rating from './../../Rating';
import {IoIosArrowDown} from 'react-icons/io'


const Product = () => {
  const [arrPrice, setArrPrice] = useState([]);
  const [isLove, setIsLove] = useState(false);
  const [loading, setLoading] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [menu, setMenu] = useState(false)


  const handleLove = () => {
    setIsLove(true);
  };

  const handleNotLove = () => {
    setIsLove(false);
  };

  const handleMenu = () => {
    setMenu(!menu)
  };

  const { state, dispatch } = GetDataToContext();
  const {allProducts} = state;
  const {productId} = state

  useEffect(() => {
    if ((productId === 0 || productId) && allProducts) {
      let priceArr = [];
      allProducts[productId]?.productTypes.forEach((price, index) => {
        priceArr.push(price?.price);
      });
      setArrPrice(priceArr);
    }
  }, [productId]);

  const handleRemoveProduct = () => {
    dispatch(setProductId(null));
  };


  useEffect(() => {
    getAllProducts().then((data) => {
      dispatch(setAllProductsContext(data))
      setLoading(true)
    })
  }, [productId])


  const handleDisApprove = (id, status) => {
    handleProduct(id, status).then((data) => {
      if (data) {
        setOverlay(false)
        dispatch(setProductId(null));
        dispatch(setAlertType("disApprove"))
      }
    })
    setTimeout(() => {
      dispatch(setAlertType(null))
    }, 3000)
   
    
  }

  const handleApprove = (id, status) => {
    handleProduct(id, status).then((data) => {
      if (data) {
        setOverlay(false)
        dispatch(setProductId(null));
        dispatch(setAlertType("approve"))
      }
    })
    setTimeout(() => {
      dispatch(setAlertType(null))
    }, 3000)
   
  }

  return (
    <div className="w-full h-auto flex flex-col justify-center  overflow-y-scroll">
      {/* custom */}
      {/* <div className="bg-slate-300 w-full h-auto flex items-center justify-start p-3">
        <span className="text-sm text-headingColor mr-10">Sắp xếp theo</span>
        <ButtonCustom type="primary" text="Phổ biến" />
        <ButtonCustom type="danger" text="Mới nhất" />
        <ButtonCustom type="primary" text="Bán chạy" />
        <div className="relative flex items-center justify-center">
          <ButtonCustom type="price" text="Giá" 
          // onClick={handleMenu} 
          />
          <i className=""></i>
          <AnimatePresence>
            {isPrice && (
              <motion.ul
                initial={{ opacity: 0, translateY: -30 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -30 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-12 p-0 -right-10 bg-slate-300 w-36 h-auto rounded-sm backdrop-blur-sm overflow-hidden"
              >
                <li className="p-2 w-full hover:bg-slate-400 text-xs">
                  <a href="" className="">
                    Giá: Từ cao đến thấp
                  </a>
                </li>
                <li className="p-2 w-full hover:bg-slate-400 text-xs">
                  <a href="" className="">
                    Giá: Từ thấp đến cao
                  </a>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div> */}

      {/* <nav className="-mt-2">
          <ul className="w-full flex flex-row overflow-x-scroll config bg-transparent h-20 items-center scroll-0">
            <ButtonCustom type="others" text="Sản phẩm" />
            <ButtonCustom type="others" text="On Sale" />

            <ButtonCustom type="others" text="Phụ kiện" />

            <ButtonCustom type="others" text="Giày thể thao" />

            <ButtonCustom type="others" text="Kính mắt chống ánh sáng xanh" />

            <ButtonCustom type="others" text="Đồ ăn thú cưng" />

            <ButtonCustom type="others" text="Túi đeo chéo" />

            <ButtonCustom type="others" text="Quần ống suông giá rẻ" />

            <ButtonCustom type="others" text="Sticker ngộ nghĩnh" />
            <ButtonCustom type="others" text="Nội thất" />

            <ButtonCustom type="others" text="Đồ trang điểm" />

            <ButtonCustom type="others" text="Dụng cụ nhà bếp" />
            <ButtonCustom type="others" text="Sticker ngộ nghĩnh" />
            <ButtonCustom type="others" text="Nội thất" />

            <ButtonCustom type="others" text="Đồ trang điểm" />

            <ButtonCustom type="others" text="Dụng cụ nhà bếp" />
            <ButtonCustom type="others" text="Sticker ngộ nghĩnh" />
            <ButtonCustom type="others" text="Nội thất" />

            <ButtonCustom type="others" text="Đồ trang điểm" />

            <ButtonCustom type="others" text="Dụng cụ nhà bếp" />
          </ul>
      </nav> */}

      <div
        className="w-full flex flex-row flex-wrap mx-auto mt-8 relative"
      >


        <div className="w-full border border-gray-300 shadow-sm backdrop-blur-sm rounded-md relative mt-4">
                <span className="absolute top-4 left-4 text-sm text-headingColor font-semibold">
                 Product
                </span>
                <div className="flex flex-wrap mx-auto items-start mt-16 relative"
                   style={{ minWidth: "80%", width: "80%" }}
                >

                  {
                    loading ? (
                      state?.allProducts ? (
                        state?.allProducts.map((product, index) => {
                          return <>
                                <ProductCard 
                                key={index}
                                text= {product?.name}
                                id= {index}
                                image={product?.images[0]?.url}
                                rate={product?.rate}
                                count={product?.soldNumber}
                                price={product?.productTypes} />
                          </>
                        })
                      ) : null

                    ) : <Loading />
                  }
                </div>
        </div>
       
      

       
          

        <AnimatePresence>
            {(productId || productId == 0) && (
              <motion.div
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -50 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fixed bg-slate-100 top-40 z-10 flex flex-col justify-start pt-12 rounded-md 
                shadow-md backdrop-blur-md border border-gray-300 overflow-y-scroll overflow-x-hidden"
                style={{
                  maxHeight: "500px",
                  maxWidth: "400px",
                  height: "500px",
                  width: "400px",
                  left: "700px",
                }}
              >


                
                {/* <div className="w-full flex items-center justify-start ml-3 mt-8"> */}
                 <div className="bg-white py-2">
                   <div className="flex items-center justify-center">
                    <img
                          src={allProducts[productId]?.images[0]?.url}
                          alt="None"
                          // className="w-14 h-14 object-cover rounded-full border border-gray-200 "
                          className="w-60 h-72 object-cover mt-2"
                        />
                   </div>
                   <span
                    className="h-6 text-headingColor font-semibold text-sm flex items-center mt-2 px-6"
                    style={{ lineHeight: "30px" }}
                                   >
                    {allProducts[productId]?.name}
                                   </span>
                   
                                   <div className="px-6">
                    <span className="text-red-600 font-semibold text-xs">
                      {`${Math.min(...arrPrice)}đ-${Math.max(...arrPrice)}đ`}
                    </span>
                                   </div>
                   
                   
                                   <div className="w-full flex flex-row items-center justify-between mx-1 px-6">
                    <div className="flex items-center justify-center mt-1">
                      <Rating value={allProducts[productId]?.rate}/>
                      <span className="px-1 border-l border-red-600 ml-1">Đã bán: {allProducts[productId]?.soldNumber}</span>
                    </div>
                    {isLove || (
                      <AiOutlineHeart
                        className="text-red-600 mr-4 text-md"
                        onClick={handleLove}
                      />
                    )}
                    {isLove && (
                      <AiFillHeart
                        className="text-red-600 mr-4 text-md"
                        onClick={handleNotLove}
                      />
                    )}
                                   </div>
                 </div>


                 <div className="bg-white flex flex-col py-2 pl-3 mt-3">
                    <div className="flex items-center justify-start">
                      <img
                            src={allProducts[productId]?.shop?.avatar}
                            alt="None"
                            className="w-12 h-12 object-cover rounded-full border border-gray-200 "
                      />
                      <div>
                        <p className="font-semibold text-sm"> {allProducts[productId]?.shop?.name}</p>
                        <p className="text-headingColor opacity-80 text-xs mt-1">{allProducts[productId]?.shop?.description}</p>
                      </div>
                    </div>

                    <div className="float-right flex items-center justify-start ml-12">
                      <span className="opacity-80 text-xs">Đánh giá: {allProducts[productId]?.shop?.rate}/5</span>
                    </div>
                 </div>


                 <div className="bg-white flex flex-col justify-center py-2 pl-3 mt-3">
                    <div className="flex items-center justify-between py-1">
                      <span className="font-semibold text-sm ml-3">Chi tiết sản phẩm</span>
                      <IoIosArrowDown className= {`text-md mr-8 cursor-pointer ${menu ? "rotate-180" : null}`}
                        onClick={handleMenu}
                      />

                    </div>

                    <AnimatePresence>
                        {
                          menu && (
                            <motion.div 
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              exit={{opacity: 0}}
                              transition={{duration: 0.5, delay: 0.1}}
                              className="flex flex-col justify-center py-1 mt-2">

                              <div className="flex items-center justify-evenly py-1 px-2">
                                <span className="text-sm opacity-95">
                                    Ngành hàng
                                </span>
                                <span className="text-sm opacity-80">
                                  {allProducts[productId]?.category?.title}
                                </span>

                              </div>

                              <div className="flex items-center justify-evenly py-1 px-2">
                                <span className="text-sm opacity-95">
                                    Status
                                </span>
                                <span className="text-sm opacity-80">
                                  {allProducts[productId]?.status}
                                </span>

                              </div>

                            </motion.div>
                          )
                        }
                    </AnimatePresence>

                    <hr />
                    

                    <div className="flex flex-col pt-2 pb-4">
                        <span className="font-semibold text-sm ml-3">Mô tả sản phẩm</span>
                        <span className="text-sm mx-3 mt-1">{allProducts[productId]?.description}</span>
                    </div>
                 </div>

                 
                 
                 
                 
                 <FiDelete
                  onClick={handleRemoveProduct}
                  className="absolute top-3 right-6 text-xl font-semibold hover:text-red-600 cursor-pointer"
                />
                <AiOutlineClear 
                  className="absolute top-2 left-3 text-2xl font-semibold hover:text-red-600 cursor-pointer"
                  onClick={() => setOverlay(true)}
                /> 
                 
                 
                  <AnimatePresence>
                  
                  {
                    overlay && (
                      <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.4, delay: 0.1}}
                        className="absolute top-0 right-0 left-0 bottom-0 bg-slate-300 px-2 flex flex-col justify-start pt-40">
                            <span className="font-semibold text-lg text-red-700 text-center mb-3">Are you sure to delete it?</span>
                            <div className="flex items-center justify-evenly">
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-red-600 text-black font-semibold text-md" type="button" name="no"
                                onClick={() => handleApprove(allProducts[productId]?.id, "approve")}
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-blue-600 text-white font-semibold textmds" type="button" name="no"
                                onClick={() => handleDisApprove(allProducts[productId]?.id, "disapprove")}
                              >
                                Disapprove
                              </motion.button>
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-white text-black font-semibold text-md" type="button" name="no"
                                onClick={() => setOverlay(false)}
                              >
                                Cancel
                              </motion.button>
                            </div>
                      </motion.div>
                    )
                  }
                </AnimatePresence>
                 
                 
                 
                 
                  {/* <div> */}






                    {/* <p className="mt-3 font-semibold ml-2 text-lg">
                      {allPosts[postId]?.product?.shop?.name}
                    </p>
                    <p className="flex items-center ml-2 text-headingColor opacity-80 text-sm">{`Shop `} <BsFillChatSquareFill className="ml-1 mr-1"/> {` `} {`${moment(allPosts[postId]?.createdTime).startOf('day').fromNow()}`}</p>
                  </div>

                <span className="mt-2 text-md text-black ml-3">
                  {allPosts[postId]?.postContentText}
                </span>
                
                <div className="mx-auto flex justify-center items-center">
                  <img
                      src={allPosts[postId]?.imageUrl}
                      alt="None"
                      className="w-60 h-72 object-cover ml-3 mt-2 mx-auto"
                    />
                </div>


                <div className="flex flex-col justify-center px-16">
                  <span className="mt-3 font-semibold">
                      {allPosts[postId]?.product?.name}
                    </span>
                    <span className="opacity-90 text-red-800">
                      Price:{" "}
                      {arrPrice.length === 0
                        ? null
                        : `${Math.min(...arrPrice)}đ-${Math.max(...arrPrice)}đ`}
                    </span>
                </div> */}


                {/* <div className="flex items-center ml-3 mt-2">
                  <div className="border-r-0">
                    <img
                          src={allPosts[postId]?.voucher?.img}
                          alt="None"
                          className="w-12 h-12 object-cover rounded-full border border-gray-200 "
                        />
                  </div>
                  <div className="mt-1 ml-1 relative">
                    <p className="font-semibold text-sm">Giảm 
                    {allPosts[postId]?.voucher?.discount ? `${allPosts[postId]?.voucher?.discount * 100}%` : `20%`}
                    </p>
                    <p className="text-headingColor opacity-80 text-xs mt-1">Hạn sử dụng: 
                    {allPosts[postId]?.voucher?.endTime ? `${moment(allPosts[postId]?.voucher?.endTime).startOf('day').fromNow()}` : "None"}
                    </p>
                    <button className="bg-red-600 text-white text-sm px-3 py-1 outline-none shadow-sm rounded-sm backdrop-blur-sm
                    absolute -right-52 top-3"
                      onClick={() => setSave(true)}
                    >
                      {save ? "Đã lưu" : "Lưu"}
                    </button>
                  </div>
                </div> */}

                {/* <div className="mt-3 shadow-md backdrop-blur-md border-t-2 border-gray-200 flex items-center justify-around py-2">
                 <div className="flex items-center">
                  <AiOutlineHeart className="text-red-600 mr-1 text-lg"/>
                  <span className="text-xs">
                    {allPosts[postId]?.likes?.likeNums}
                    </span>
                 </div>
                 <div className="flex items-center">
                  <BiMessageAltDetail className="mr-1 text-lg"/>
                  <span className="text-xs">2</span>
                 </div>
                </div>
                
                
                
                <FiDelete
                  onClick={handleRemoveProduct}
                  className="absolute top-1 right-3 text-xl font-semibold hover:text-red-600 cursor-pointer"
                />
                <AiOutlineClear 
                  className="absolute top-2 left-3 text-2xl font-semibold hover:text-red-600 cursor-pointer"
                  onClick={() => setOverlay(true)}
                /> */}

                {/* <AnimatePresence>
                  
                  {
                    overlay && (
                      <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.4, delay: 0.1}}
                        className="absolute top-0 right-0 left-0 bottom-0 bg-slate-300 px-2 flex flex-col justify-start pt-40">
                            <span className="font-semibold text-lg text-red-700 text-center mb-3">Are you sure to delete it?</span>
                            <div className="flex items-center justify-evenly">
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-red-600 text-black font-semibold text-md" type="button" name="no"
                                onClick={() => handleApprove(allPosts[postId]?.id, "approve")}
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-blue-600 text-white font-semibold textmds" type="button" name="no"
                                onClick={() => handleDisApprove(allPosts[postId]?.id, "disapprove")}
                              >
                                DisApprove
                              </motion.button>
                            </div>
                      </motion.div>
                    )
                  }
                </AnimatePresence> */}
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
