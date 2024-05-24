import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/svg-icon/Icon";
import Input from "../../components/Input/Input";
import api from "../../api/api";
import { saveToken } from "../utils/utils";

const register = async (newUser) => {
  const { data } = await api.post("/register", newUser);
  saveToken(data.token);
};

export default function Register() {
  const nav = useNavigate();
  const [username, setUdername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navToLogin = () => nav("/login");

  const { isLoading, mutate } = useMutation(register, {
    onError: (err) => {
      setError(err.response.data);
    },
    onSuccess: () => {
      nav("/orders");
    },
  });

  const submit = (e) => {
    setUdername("");
    setPassword("");
    setRepeatPassword("");

    if (repeatPassword !== password) {
      setError("Repeat password and password fields should be the same");
    }

    mutate({ username, password });
    e.preventDefault();
  };
  return (
    <div className="login-container">
      <form className="login" onSubmit={submit}>
        <h2 className="login-title">Register</h2>

        <Input
          placeholder="Enter your name..."
          callback={setUdername}
          value={username}
        />
        <Input
          placeholder="Enter your password..."
          type="password"
          callback={setPassword}
          value={password}
        />
        <Input
          placeholder="Repeat your password..."
          type="password"
          callback={setRepeatPassword}
          error={error}
          value={repeatPassword}
        />
        {isLoading ? (
          "Loading"
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

        <span className="link-to" onClick={navToLogin}>
          Login
        </span>
      </form>
    </div>
  );
}
