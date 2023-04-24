import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api";
import Loading from './loadingToast/Loading';
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  

  const [name, setName] = useState("")
    const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleSubmit= (e) => {
      e.preventDefault();
      setLoading(true)
      const body = {
        username: name,
        password,
      }
      loginAdmin(body).then((data) => {
       setTimeout(() => {
        if (data) {
          setName("")
          setPassword("")
          localStorage.setItem('authShop', JSON.stringify(data))
          setLoading(false)
          navigate("/home/product")
        } else {
          setLoading(false)
          toast.error("UserName or Password wrong!")
        }
       }, 1000)
      })
    }


    useEffect(() => {
      if (JSON.parse(localStorage.getItem('authShop'))) {
        navigate("/home/product");
      }
    }, [])


  return (


    <>
      <div className="w-full h-full bg-slate-100 py-32">
      <ToastContainer />
       
        <p className="mx-auto flex items-center justify-center text-headingColor font-semibold text-2xl">Please login to continue</p>
        <div
          className="shadow-lg backdrop-blur-sm 
                    rounded-sm px-2 py-4 mt-4 border border-gray-200 mx-auto"
          style={{ minWidth: "30%", width: "30%" }}
        >

          {loading && <Loading />}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                        placeholder:text-headingColor placeholder:text-lg
                        placeholder:opacity-70 mx-auto"
              name="name"
              type="text"
              placeholder="Name"
              style={{ maxWidth: "90%", width: "90%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="py-3 px-4 mb-6 mt-1 bg-slate-200 text-headingColor text-lg 
                        placeholder:text-headingColor placeholder:text-lg
                        placeholder:opacity-70 mx-auto"
              name="password"
              type="password"
              placeholder="Password"
              style={{ maxWidth: "90%", width: "90%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="submit"
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                        font-semibold opacity-80 hover:opacity-100
                        mx-auto"
              value="LOGIN"
              style={{ maxWidth: "90%", width: "90%", backgroundColor: "#1cb803" }}
            />
          </form>
        </div>

      </div>
    </>
  );
};

export default Login;
