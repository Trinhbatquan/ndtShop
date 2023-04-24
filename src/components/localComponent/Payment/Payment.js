import React, {useState, useEffect} from "react";
import Button from "../../Button/Button";
import { ButtonCustom } from "../../../components";
import NewsCart from "./NewsCart";
import { NavLink} from "react-router-dom";
import { GetDataToContext } from "../../../context/ProviderContext";
import Loading from "../../loadingToast/Loading";
import { getNews } from "../../../api";
import { setAllNews } from "../../../context/reducer";

const Payment = () => {

    const [loading, setLoading] = useState(false)


    const {state, dispatch} = GetDataToContext()
    const {allNews} = state
    console.log({allNews})

    useEffect(() => {
      getNews().then((news) => {
        dispatch(setAllNews(news))
        setLoading(true)
      })
    }, [])


    

  return (
    <div className="p-2 flex flex-col">
      <div className="flex items-center justify-between">
        {/* <div className="bg-slate-300 w-full h-auto flex items-center justify-start p-3 mr-12">
          <span className="text-sm text-headingColor mr-10">Sắp xếp theo</span>
          <ButtonCustom type="primary" text="Phổ biến" />
          <ButtonCustom type="danger" text="Mới nhất" />
        </div> */}

        <NavLink to="create">
          <Button
            text="Create News"
            type="others"
            style={{ maxWidth: "20%", width: "20%" }}
          />
        </NavLink>
      </div>

      <div className="w-full border border-gray-300 shadow-sm backdrop-blur-sm rounded-md relative mt-4">
        <span className="absolute top-4 left-4 text-sm text-headingColor font-semibold">
          Top News
        </span>

        <div className="flex flex-wrap items-start mt-16 justify-center">

            {
              loading ? allNews?.map((item, index) => {
                return <NewsCart key={index} text={item?.title} image={item?.imageUrl} id={item?.id} />
              })
               : (
                <Loading />
              )
            }
        </div>
      </div>
    </div>
  );
};

export default Payment;
