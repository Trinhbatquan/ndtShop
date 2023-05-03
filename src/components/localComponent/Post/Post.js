import React, { useState, useEffect, useRef } from "react";
import { ButtonCustom } from "../../../components";
import PostCard from "./PostCard";
import { AnimatePresence, motion } from "framer-motion";
import { GetDataToContext } from "../../../context/ProviderContext";
import { FiDelete } from "react-icons/fi";
import { setAlertType, setAllPosts, setPostId } from "./../../../context/reducer";
import { getPosts, handlePost } from "../../../api";
import Loading from "../../loadingToast/Loading";
import {BsFillChatSquareFill} from 'react-icons/bs'
import moment from 'moment'
import {AiOutlineHeart, AiOutlineClear} from 'react-icons/ai'
import {BiMessageAltDetail} from 'react-icons/bi'

const Post = () => {
  const [loading, setLoading] = useState(false);
  const [arrPrice, setArrPrice] = useState([]);
  const [save, setSave] = useState(false)
  console.log({ arrPrice });
  const [overlay, setOverlay] = useState(false)

  const { state, dispatch } = GetDataToContext();
  const { allPosts } = state;
  const { postId } = state;

  console.log({ allPosts, postId });
  useEffect(() => {
    if ((postId === 0 || postId) && allPosts) {
      let priceArr = [];
      allPosts[postId]?.product?.productTypes.forEach((price, index) => {
        priceArr.push(price?.price);
      });
      setArrPrice(priceArr);
    }
  }, [postId]);

  useEffect(() => {
    getPosts().then((post) => {
      console.log({post})
      dispatch(setAllPosts(post));
      setLoading(true);
    });
  }, [postId]);

  const handleRemoveProduct = () => {
    dispatch(setPostId(null));
  };

  const handleDisApprove = (id, status) => {
    handlePost(id, status).then((data) => {
      if (data) {
        setOverlay(false)
        dispatch(setPostId(null));
        dispatch(setAlertType("disApprove"))
      }
    })
    setTimeout(() => {
      dispatch(setAlertType(null))
    }, 3000)
   
    
  }

  const handleApprove = (id, status) => {
    handlePost(id, status).then((data) => {
      if (data) {
        setOverlay(false)
        dispatch(setPostId(null));
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
      </div> */}

      <div className="w-full border border-gray-300 shadow-sm backdrop-blur-sm rounded-md relative mt-4 pb-32">
        <span className="absolute top-4 left-4 text-sm text-headingColor font-semibold">
          New Post
        </span>

        <div className="flex flex-wrap items-start mt-16 relative justify-center">
          {loading ? (
            allPosts?.map((post, index) => {
              return (
                <PostCard
                  image={post?.imageUrl}
                  key={index}
                  text={post?.shop?.name}
                  content={post?.postContentText}
                  id={index}
                  nameProduct={post?.product?.name}
                  priceProduct={post?.product?.productTypes}
                  rateProduct={post?.product?.rate}
                />
              );
            })
          ) : (
            <Loading />
          )}

          <AnimatePresence>
            {(postId || postId == 0) && (
              <motion.div
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -50 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fixed bg-slate-100 top-10 z-10 flex flex-col justify-start pt-3 rounded-md 
                shadow-md backdrop-blur-md border border-gray-300 overflow-y-scroll overflow-x-hidden pt-3"
                style={{
                  maxHeight: "450px",
                  maxWidth: "450px",
                  height: "450px",
                  width: "450px",
                  left: "380px",
                  zIndex: 10,
                }}
              >


                
                <div className="w-full flex items-center justify-start ml-3 mt-8">
                  <img
                      src={allPosts[postId]?.shop?.avatar}
                      alt="None"
                      className="w-14 h-14 object-cover rounded-full border border-gray-200 "
                    />
                  <div>
                    <p className="mt-3 font-semibold ml-2 text-lg">
                      {allPosts[postId]?.product?.shop?.name}
                    </p>
                    <p className="flex items-center ml-2 text-headingColor opacity-80 text-sm">{`Shop `} <BsFillChatSquareFill className="ml-1 mr-1"/> {` `} {`${moment(allPosts[postId]?.createdTime).startOf('day').fromNow()}`}</p>
                  </div>
                </div>

                <span className="mt-2 text-md text-black mx-3">{allPosts[postId]?.postContentText}</span>
                
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
                </div>


                <div className="flex items-center ml-3 mt-2">
                  <div className="border-r-0">
                    <img
                          src={allPosts[postId]?.voucher?.img}
                          alt="None"
                          className="w-12 h-12 object-cover rounded-full border border-gray-200 "
                        />
                  </div>
                  <div className="mt-1 ml-1 relative">
                    <p className="font-semibold text-sm">Giảm {allPosts[postId]?.voucher?.discount ? `${allPosts[postId]?.voucher?.discount * 100}%` : `20%`}</p>
                    <p className="text-headingColor opacity-80 text-xs mt-1">Hạn sử dụng: {allPosts[postId]?.voucher?.endTime ? `${moment(allPosts[postId]?.voucher?.endTime).startOf('day').fromNow()}` : "None"}</p>
                    <button className="bg-red-600 text-white text-sm px-3 py-1 outline-none shadow-sm rounded-sm backdrop-blur-sm
                    absolute -right-52 top-3"
                      onClick={() => setSave(true)}
                    >{save ? "Đã lưu" : "Lưu"}</button>
                  </div>
                </div>

                <div className="mt-3 shadow-md backdrop-blur-md border-t-2 border-gray-200 flex items-center justify-around py-2">
                 <div className="flex items-center">
                  <AiOutlineHeart className="text-red-600 mr-1 text-lg"/>
                  <span className="text-xs">{allPosts[postId]?.likes?.likeNums}</span>
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
                                onClick={() => handleApprove(allPosts[postId]?.id, "approve")}
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileTap={{scale: 0.75}}
                                className="outline-none rounded-md shadow-sm backdrop-blur-sm px-3 py-2 bg-blue-600 text-white font-semibold textmds" type="button" name="no"
                                onClick={() => handleDisApprove(allPosts[postId]?.id, "disapprove")}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Post;
