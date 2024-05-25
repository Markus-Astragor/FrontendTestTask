import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/api";
import "./dist/Orders.css";

const fetchOrders = async () => {
  const { data } = await api.get("/getOrders");
  return data;
};

const deleteOrder = async (id) => {
  const { data } = await api.delete(`/deleteOrder/${id}`);
  return data;
};

export default function Orders() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const { data, error, isLoading } = useQuery("orders", fetchOrders, {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(deleteOrder, {
    onError: (err) => {
      console.log("err", err);
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
      <div className="orders">
        <div className="all-orders">
          {Array.isArray(data) ? (
            data.length &&
            Array.isArray(data) !== 0 && (
              <>
                <span className="customer-id">Id of order</span>
                <span>Additional message</span>
                <span>Items quantity in order</span>
                <span className="price">Price</span>
                <span className="control-panel">Control panel</span>
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
                      className="edit-btn"
                      onClick={() => nav(`/orders/edit/${order._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => mutation.mutate(order._id)}
                    >
                      Delete
                    </button>
                  </React.Fragment>
                ))}
              </>
            )
          ) : (
            <p className="any-orders-text">{data}</p>
          )}
        </div>
        <div>
          <button onClick={() => nav("add")}>Add order</button>
        </div>
      </div>
    </div>
  );
}
