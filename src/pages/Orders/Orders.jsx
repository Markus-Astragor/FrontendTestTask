import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/api";

const fetchOrders = async () => {
  const { data } = await api.get("/getOrders");
  console.log(data);
};

export default function Orders() {
  const nav = useNavigate();
  const token = Cookies.get("token");

  const { data, error, isLoading } = useQuery("/getOrders", fetchOrders);

  useEffect(() => {
    if (!token) nav("/login");
  }, [token, nav]);

  return (
    <div className="orders-container">
      {isLoading ? "Loading..." : "Orders"}
    </div>
  );
}
