import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/utils";
import Icon from "../../components/svg-icon/Icon";
import Input from "../../components/Input/Input";
import api from "../../api/api";
import "./dist/Login.css";

const login = async (user) => {
  const { data } = await api.post("/login", user);
  saveToken(data.token);
};

export default function Login() {
  const nav = useNavigate();
  const [username, setUdername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoading, mutate } = useMutation(login, {
    onError: (err) => {
      console.log("err", err);
      setError(err.response.data);
    },
    onSuccess: () => {
      nav("/orders");
    },
  });

  const navToRegister = () => nav("/register");

  const submit = (e) => {
    e.preventDefault();

    setUdername("");
    setPassword("");
    setError("");

    if (!username || !password) return;
    mutate({ username, password });
    e.preventDefault();
  };
  return (
    <div className="login-container">
      <form className="login" onSubmit={submit}>
        <h2 className="login-title">Login</h2>

        <Input
          placeholder="Enter your name..."
          callback={setUdername}
          value={username}
        />
        <Input
          value={password}
          placeholder="Enter your password"
          type="password"
          callback={setPassword}
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
        <span className="link-to" onClick={navToRegister}>
          Register
        </span>
      </form>
    </div>
  );
}
