import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Input from "../../components/Input/Input";
import Icon from "../../components/svg-icon/Icon";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import validate from "../../utils/validate";

const addOrder = async (order) => {
  const { data } = await api.post("/createOrder", order);
  return data;
};

export default function AddOrder() {
  const [price, setPrice] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const token = Cookies.get("token");

  const navToOrders = () => nav("/orders");

  const { isLoading, mutate } = useMutation(addOrder, {
    onError: (err) => {
      console.log("err", err);
      setError(err.resposne.data);
    },
    onSuccess: () => {
      nav("/orders");
    },
  });

  const submit = (e) => {
    e.preventDefault();
    const changedPrice = Math.round(+price);
    const changedQuantity = Math.round(+quantity);
    console.log("price", changedPrice);
    console.log("additionalMessage", additionalMessage);
    console.log("itemId", itemId);
    console.log("name", name);
    console.log("description", description);
    console.log("quantity", changedQuantity);

    const result = validate(
      {
        price: changedPrice,
        additionalMessage,
        itemId,
        name,
        description,
        quantity: changedQuantity,
      },
      setError
    );

    if (!result) {
      return;
    }

    mutate({
      price: changedPrice,
      additionalMessage,
      itemsList: [{ itemId, name, description, quantity: changedQuantity }],
    });
  };

  useEffect(() => {
    if (!token) nav("/login");
  }, [nav, token]);
  return (
    <div className="login-container">
      <form className="login" onSubmit={submit}>
        <h2 className="login-title">Add your order</h2>

        <Input
          type="number"
          placeholder="Enter your price..."
          callback={setPrice}
          value={price}
        />
        <Input
          placeholder="Enter your additional message..."
          type="text"
          callback={setAdditionalMessage}
          value={additionalMessage}
        />

        <Input
          placeholder="Enter your item id..."
          type="text"
          callback={setItemId}
          value={itemId}
        />

        <Input
          placeholder="Enter name of item..."
          type="text"
          callback={setName}
          value={name}
        />

        <Input
          placeholder="Enter description of item..."
          type="text"
          callback={setDescription}
          value={description}
        />

        <Input
          placeholder="Enter quantity of item..."
          type="number"
          callback={setQuantity}
          value={quantity}
          error={error}
        />

        {isLoading ? (
          "Loading..."
        ) : (
          <div className="btn-container login-btn-container">
            <button className="welcome-btn login-btn">Submit</button>
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
        )}

        <span className="link-to" onClick={navToOrders}>
          All orders
        </span>
      </form>
    </div>
  );
}
