import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Input from "../../components/Input/Input";
import Icon from "../../components/svg-icon/Icon";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const addOrder = async (obj) => {
  const { data } = await api.put(`/updateOrder/${obj.id}`, obj.order);
  return data;
};

const fetchOrderById = async (id) => {
  const { data } = await api.get(`/getOrders/${id}`);
  return data;
};

export default function EditOrder() {
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const nav = useNavigate();
  const token = Cookies.get("token");

  const navToOrders = () => nav("/orders");

  const { error, isLoading } = useQuery(
    ["order", id],
    () => fetchOrderById(id),
    {
      onSuccess: (data) => {
        setPrice(data.price);
        setAdditionalMessage(data.additionalMessage);
        if (data.itemsList.length > 0) {
          setItemId(data.itemsList[0].itemId);
          setName(data.itemsList[0].name);
          setDescription(data.itemsList[0].description);
          setQuantity(data.itemsList[0].quantity);
        }
      },
      onError: (err) => {
        console.log("err", err);
      },
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation(addOrder, {
    onError: (err) => {
      console.log("err", err);
    },
    onSuccess: () => {
      nav("/orders");
    },
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({
      id,
      order: {
        price: +price,
        additionalMessage,
        itemsList: [{ itemId, name, description, quantity: +quantity }],
      },
    });
  };

  useEffect(() => {
    if (!token) nav("/login");
  }, [nav, token]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="login-container">
      <form className="login" onSubmit={submit}>
        <h2 className="login-title">Edit your order</h2>

        <Input
          type="number"
          placeholder="Enter your price..."
          value={price}
          callback={setPrice}
        />
        <Input
          placeholder="Enter your additional message..."
          type="text"
          value={additionalMessage}
          callback={setAdditionalMessage}
        />
        <Input
          placeholder="Enter your item id..."
          type="text"
          value={itemId}
          callback={setItemId}
        />
        <Input
          placeholder="Enter name of item..."
          type="text"
          value={name}
          callback={setName}
        />
        <Input
          placeholder="Enter description of item..."
          type="text"
          value={description}
          callback={setDescription}
        />
        <Input
          placeholder="Enter quantity of item..."
          type="number"
          value={quantity}
          callback={setQuantity}
        />
        <div className="btn-container login-btn-container">
          <button className="welcome-btn login-btn" type="submit">
            Submit
          </button>
          <div className="icon-container login-icon-container">
            <Icon
              iconName={"right-arrow"}
              width="32"
              fill="#fff"
              stroke="#fff"
              viewBox="0 0 32 32"
            />
          </div>
        </div>
        <span className="link-to" onClick={navToOrders}>
          All orders
        </span>
      </form>
    </div>
  );
}
