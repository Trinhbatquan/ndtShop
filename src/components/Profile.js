import React, { useEffect, useState } from "react";
import { BsFillBagHeartFill, BsShop } from "react-icons/bs";
import {MdGrade} from 'react-icons/md'
import logo from "../assets/logo/logo3.png";
import { getShop } from "../api";
import { GetDataToContext } from "../context/ProviderContext";
import { setShopContext } from "../context/reducer";
import Loading from '../components/loadingToast/Loading'


const Profile = () => {

  const [name, setName] = useState("")
  const [des, setDes] = useState("")
  const [url, setUrl] = useState("")
  const [address, setAddress] = useState("")


 
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    // getShop().then((data) => {
    //   dispatch(setShopContext(data[2]))
      setLoading(false)
      setTimeout(() => {
        if (JSON.parse(localStorage.getItem('authShop'))) {
          console.log(1)
          const {firstName, lastName, avatarUrl, emailAddress, role} = JSON.parse(localStorage.getItem('authShop'));
          setName(`${firstName} ${lastName}`)
          setDes(role?.description)
          setAddress(emailAddress)
          setUrl(avatarUrl)
          setLoading(true)
        }
      }, 1000)
    }, [])

  return (
     <div 
      className="h-auto flex flex-col">

      {
        loading ? (
          <>
            <div className="w-full flex flex-col text-center items-center justify-center">
              <p className="text-3xl text-black opacity-70 font-semibold">Profile</p>
              <p className="text-md text-textColor">Have a good day everybody!!!</p>
            </div>
            <div className="w-full p-4 flex flex-row items-center justify-evenly pt-8 mt-8">
              <div className="flex flex-col items-start justify-center flex-1">
                <p className="pb-4 text-xl text-black opacity-80 font-semibold">
                  About me
                </p>
                <p className="pb-4 text-md text-textColor flex items-center justify-center">
                  {<BsShop className="text-textColor font-lg mr-2 mb-1" />}{name}
                </p>
                <p className="pb-4 text-md text-textColor flex items-center justify-center">
                  {<BsShop className="text-textColor font-lg mr-2 mb-1" />}{des}
                </p>
                {/* <p className="pb-4 text-md text-textColor">
                  <span>
                    {" "}
                    Nếu bạn cảm thấy hài lòng về dịch cụ của shop, vui lòng đánh giá 5
                    sao ủng hộ shop nhé!
                  </span>
                  <div className="flex items-center justify-start">
                    {<BsFillBagHeartFill className="mr-1" />}
                    {<BsFillBagHeartFill className="mr-1" />}
                    {<BsFillBagHeartFill />}
                  </div>
                </p> */}
              </div>

              <div className="flex flex-col items-center justify-evenly flex-1">
                <img src={url}  alt="none" 
                  className="h-60 w-60 rounded-full shadow-md backdrop-blur-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-center flex-1">
                <p className="pb-4 text-xl text-black opacity-80 font-semibold">
                  Detail
                </p>
                <p className="pb-4 text-md text-textColor flex items-center justify-center">
                  {/* {<MdGrade className="text-red-900 font-xl" />}
                  {<MdGrade className="text-red-900 font-xl" />}
                  {<MdGrade className="text-red-900 font-xl mr-2" />} */}
                  EmailAddress: {address}
                </p>
                {/* <p className="pb-4 text-md text-textColor">
                  <span>
                    {" "}
                    Nếu bạn cảm thấy hài lòng về dịch cụ của shop, vui lòng đánh giá 5
                    sao ủng hộ shop nhé!
                  </span>
                  <div className="flex items-center justify-start">
                    {<BsFillBagHeartFill className="mr-1" />}
                    {<BsFillBagHeartFill className="mr-1" />}
                    {<BsFillBagHeartFill />}
                  </div>
                </p> */}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )
      }
    </div>
  );
};

export default Profile;
