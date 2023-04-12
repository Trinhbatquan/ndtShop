import React, { useState, useEffect} from "react";
import { ButtonCustom, ProductCard } from "../../../components";
import { AnimatePresence, motion } from "framer-motion";
import "./main.css";
import { GetDataToContext } from "../../../context/ProviderContext";
import { FiDelete } from "react-icons/fi";
import { setAllProductsContext, setProductId } from "../../../context/reducer";
import { getAllProducts } from '../../../api/index';
import Loading from '../../../components/loadingToast/Loading'

const Product = () => {
  const [isPrice, setIsPrice] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleMenu = () => {
    setIsPrice(!isPrice);
  };

  const { state, dispatch } = GetDataToContext();
  console.log(state)

  const handleRemoveProduct = () => {
    dispatch(setProductId(null));
  };


  useEffect(() => {
    getAllProducts().then((data) => {
      dispatch(setAllProductsContext(data))
      setLoading(true)
    })
  }, [])

  return (
    <div className="w-full h-auto flex flex-col justify-center  overflow-y-scroll">
      {/* custom */}
      <div className="bg-slate-300 w-full h-auto flex items-center justify-start p-3">
        <span className="text-sm text-headingColor mr-10">Sắp xếp theo</span>
        <ButtonCustom type="primary" text="Phổ biến" />
        <ButtonCustom type="danger" text="Mới nhất" />
        <ButtonCustom type="primary" text="Bán chạy" />
        <div className="relative flex items-center justify-center">
          <ButtonCustom type="price" text="Giá" onClick={handleMenu} />
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
      </div>

      <nav className="-mt-2">
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
      </nav>

      <div
        className="flex flex-row flex-wrap mx-auto mt-8 relative"
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
                      image={product?.category?.image}
                      rate={product?.rate}
                      count={product?.soldNumber}
                      price={`${product?.productTypes.length > 1 ? `${product?.productTypes[0]?.price } - ${product?.productTypes[1]?.price }` : `${product?.productTypes[0]?.price}`}`}
                />
                </>
              })
            ) : null

          ) : <Loading />
        }
     
       
      

        <AnimatePresence>
            {(state?.productId || state?.productId == 0) && (
              <motion.div
                 initial={{opacity: 0, translateY: -50}}
                animate={{opacity: 1, translateY: 0}}
                exit={{opacity: 0, translateY: -50}}
                transition={{duration: 0.4, delay: 0.2}}
                className="fixed bg-slate-100 top-64 flex items-start justify-around pt-8 rounded-md shadow-md backdrop-blur-md border border-gray-300"
                style={{ minHeight: "360px", minWidth: "650px", height: '360px', width: '650px', left: '600px'}}
              >
                <div className="flex flex-col items-start justify-start ml-16"
                  style={{maxWidth: '45%', width: '45%'}}
                >
                  <img src={state?.allProducts[state?.productId]?.category?.image} alt="None" className="w-40 h-40 object-cover" />
                  <span className="mt-3 font-semibold">{state?.allProducts[state?.productId]?.name}</span>
                  <span className="opacity-90 text-red-800">Price: {`${state?.allProducts[state?.productId]?.productTypes.length > 1 ? `${state?.allProducts[state?.productId]?.productTypes[0]?.price}đ - 
                  ${state?.allProducts[state?.productId]?.productTypes[1]?.price }đ` : `${state?.allProducts[state?.productId]?.productTypes[0]?.price}đ`}`}</span>
                  <span className="opacity-90 text-red-800">Đã bán: {state?.allProducts[state?.productId]?.soldNumber}</span>
                  <span className="opacity-90 text-red-800">Rate: {state?.allProducts[state?.productId]?.rate}/5</span>
                </div>
                <div
                  className="flex flex-col items-start justify-start ml-4"
                  style={{maxWidth: '45%', width: '45%'}}
                >
                  <span className="text-md font-semibold text-headingColor">SHOP</span>
                  <img src={state?.allProducts[state?.productId]?.shop?.avatar} alt="None" className="w-14 h-14 object-cover rounded-full border
                  border-gray-200 shadow-sm backdrop-blur-sm"/>
                  <span className="mt-2 text-md">{state?.allProducts[state?.productId]?.shop?.name}</span>
                  <span>{state?.allProducts[state?.productId]?.shop?.description}</span>
                  <span className="opacity-90 text-red-800">Rate: {state?.allProducts[state?.productId]?.shop?.rate}/5</span>
                </div>
                <FiDelete onClick={handleRemoveProduct} className="absolute top-1 right-1 text-xl font-semibold hover:text-red-600 cursor-pointer"/>
              </motion.div>
            )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
