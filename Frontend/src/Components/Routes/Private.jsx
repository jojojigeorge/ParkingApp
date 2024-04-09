import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";
import { useAuth } from "../../../Context/Auth.jsx";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [authDetails, setAuthDetails] = useAuth();
  // const header = {
  //   "Content-Type": "application/json",
  //   "Authorization": `Bearer ${authDetails.token}`,
  // };

  // const [authDetails, setAuthDetails] = useState({ user: "", token: "" });
  // axios.defaults.baseURL = "http://localhost:4001";
  // axios.defaults.headers.common["Authorization"] = authDetails.token;
  useEffect(() => {
    const data = localStorage.getItem("authDetails");
    if (data) {
      const parseData = JSON.parse(data);
      setAuthDetails({
        ...authDetails,
        user: parseData.user,
        token: parseData.token,
      });
      axios.defaults.headers.common["Authorization"] = parseData.token;
    }
  }, []);

  const userCheck=async()=>{
    try {
      const res = await axios.get("/api/v1/user/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log("error in header private");
    }
  }
  const authCheck = async () => {
    try {
      const res = await axios.get("/api/v1/user/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log("error in header private");
    }
  };
  useEffect(() => {
    if (authDetails.user.role===1){
      authCheck();
    }else{
      userCheck()

    }

  }, [authDetails?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
