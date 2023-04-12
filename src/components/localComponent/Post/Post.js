import React, { useState, useEffect, useRef } from "react";
import { ButtonCustom } from "../../../components";
import PostCard from "./PostCard";
import { AnimatePresence, motion } from "framer-motion";
import { GetDataToContext } from "../../../context/ProviderContext";
import { FiDelete } from "react-icons/fi";
import { setAllPosts, setPostId } from "./../../../context/reducer";
import { getPosts } from "../../../api";
import Loading from "../../loadingToast/Loading";

const Post = () => {
  const [loading, setLoading] = useState(false);
  const [arrPrice, setArrPrice] = useState([]);
  console.log({ arrPrice });

  const { state, dispatch } = GetDataToContext();
  const { allPosts } = state;
  const { postId } = state;

  console.log({ allPosts, postId });
  useEffect(() => {
    if ((postId === 0 || postId) && allPosts) {
      console.log(1);
      let priceArr = [];
      allPosts[postId]?.product?.productTypes.forEach((price, index) => {
        priceArr.push(price?.price);
      });
      setArrPrice(priceArr);
    }
  }, [postId]);

  useEffect(() => {
    getPosts().then((post) => {
      dispatch(setAllPosts(post));
      setLoading(true);
    });
  }, []);

  const handleRemoveProduct = () => {
    dispatch(setPostId(null));
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center  overflow-y-scroll">
      {/* custom */}
      <div className="bg-slate-300 w-full h-auto flex items-center justify-start p-3">
        <span className="text-sm text-headingColor mr-10">Sắp xếp theo</span>
        <ButtonCustom type="primary" text="Phổ biến" />
        <ButtonCustom type="danger" text="Mới nhất" />
      </div>

      <span className="font-semibold mt-2 p-2 border border-gray-400">
        New Post
      </span>

      <div className="flex flex-wrap items-start mt-8 relative justify-center">
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
              className="fixed bg-slate-100 top-64 flex items-start justify-around pt-8 rounded-md shadow-md backdrop-blur-md border border-gray-300"
              style={{
                minHeight: "360px",
                minWidth: "650px",
                height: "360px",
                width: "650px",
                left: "600px",
              }}
            >
              <div
                className="flex flex-col items-start justify-start ml-16"
                style={{ maxWidth: "45%", width: "45%" }}
              >
                <img
                  src={allPosts[postId]?.imageUrl}
                  alt="None"
                  className="w-40 h-40 object-cover"
                />
                <span className="mt-3 font-semibold">
                  {allPosts[postId]?.product?.name}
                </span>
                <span className="opacity-90 text-red-800">
                  Price:{" "}
                  {arrPrice.length === 0
                    ? null
                    : `${Math.min(...arrPrice)}đ-${Math.max(...arrPrice)}đ`}
                </span>
                <span className="opacity-90 text-red-800">
                  Rate: {allPosts[postId]?.product?.rate}/5
                </span>
                <span className="opacity-90 text-red-800">
                  Like: {allPosts[postId]?.likes?.likeNums}
                </span>
              </div>
              <div
                className="flex flex-col items-start justify-start ml-4"
                style={{ maxWidth: "45%", width: "45%" }}
              >
                <span className="text-md font-semibold text-headingColor">
                  SHOP
                </span>
                <img
                  src={allPosts[postId]?.shop?.avatar}
                  alt="None"
                  className="w-14 h-14 object-cover rounded-full border
                  border-gray-200 shadow-sm backdrop-blur-sm"
                />
                <span className="mt-2 text-md">
                  {allPosts[postId]?.shop?.description}
                </span>
                <span className="opacity-90 text-red-800">
                  Rate: {allPosts[postId]?.shop?.rate}/5
                </span>
              </div>
              <FiDelete
                onClick={handleRemoveProduct}
                className="absolute top-1 right-1 text-xl font-semibold hover:text-red-600 cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Post;
