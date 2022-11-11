import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import Api from "../utils/api";

export function Files() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const api = Api();

  useEffect(() => {
    const setLoginValue = async () => {
      const checkValue = await checkLogin();
      setIsLoggedIn(checkValue);
    };
    setLoginValue();
    !isLoggedIn ? navigate("/") : console.log("authenticated user");
  }, [isLoggedIn, navigate]);
  return <div>{}</div>;
}
