import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import api from "../../api/api";
import "./dist/Orders.css";
import Icon from "../../components/svg-icon/Icon";

const fetchOrders = async () => {
  const { data } = await api.get("/getOrders");
  return data;
};

const deleteOrder = async (id) => {
  const { data } = await api.delete(`/deleteOrder/${id}`);
  return data;
};

export default function Orders() {
  const [errorValidation, setValidationError] = useState("");
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const token = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : "";

  const { data, error, isLoading } = useQuery("orders", fetchOrders, {
    refetchOnWindowFocus: false,
  });

  const signOut = () => {
    nav("/");
    Cookies.remove("token");
  };

  const mutation = useMutation(deleteOrder, {
    onError: (err) => {
      setValidationError(err.response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });

  useEffect(() => {
    if (!token) nav("/login");
  }, [token, nav]);

  if (isLoading) {
    return <div className="orders-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="orders-container">An error occurred: {error.message}</div>
    );
  }

  return (
    <div className="orders-container">
      <header className="orders-header">
        <div className="orders-header-title">Control Orders</div>
        <div className="orders-log-out">
          {token?.username}
          <div className="log-out-icon-container" onClick={signOut}>
            <Icon
              iconName={"doors-sign-out"}
              width="32px"
              viewBox="0 0 32 32"
            />
          </div>
        </div>
      </header>
      <p className="error-paragrpah">{errorValidation}</p>
      {!Array.isArray(data) && (
        <p className="any-orders-text">{data}. Add your first order</p>
      )}
      <div className="orders">
        <div className="all-orders">
          {Array.isArray(data) && data.length !== 0 && (
            <>
              <span className="el-title customer-id">Id of order</span>
              <span className="el-title">Additional message</span>
              <span className="el-title">Items quantity in order</span>
              <span className="el-title price">Price</span>
              <span className="el-title control-panel">Control panel</span>
              {data.map((order) => (
                <React.Fragment key={order._id}>
                  <span className="customer-id">{order._id}</span>
                  <span>
                    {order.additionalMessage === ""
                      ? "Any additional message"
                      : order.additionalMessage}
                  </span>
                  <span>{order.itemsList.length}</span>
                  <span className="price">{order.price}</span>

                  <button
                    className="welcome-btn add-btn"
                    onClick={() => nav(`/orders/edit/${order._id}`)}
                  >
                    Edit
                    <Icon iconName={"pen"} width="24" fill={"#FFF"} />
                  </button>
                  <button
                    className="welcome-btn add-btn"
                    onClick={() => mutation.mutate(order._id)}
                  >
                    Delete
                    <Icon iconName={"trash"} width="24" fill={"#FFF"} />
                  </button>
                </React.Fragment>
              ))}
            </>
          )}
        </div>
        <div>
          <button className="welcome-btn add-btn" onClick={() => nav("add")}>
            Add
            <Icon
              iconName={"plus"}
              width="32"
              fill={"#FFF"}
              viewBox="0 0 32 32"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
