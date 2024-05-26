import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import validate from "../../utils/validate";
import Input from "../../components/Input/Input";
import Icon from "../../components/svg-icon/Icon";
import api from "../../api/api";
import { saveToken } from "../utils/utils";

const getToken = async (obj) => {
  const { data } = await api.post("/createToken", obj);
  saveToken(data.token);
  return data;
};

function Profile({ setUser }) {
  const [username, setUsername] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get("/auth/login/success", {
          withCredentials: true,
        });
        setUser(data.user._json);
        setUsername(data.user._json.given_name);
        setEmailVerified(data.user._json.email_verified);
        setFamilyname(data.user._json.family_name);
        setUserId(data.user._json.sub);
        console.log("data.user._json", data.user._json);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUser();
  }, [setUser]);

  const { isLoading, mutate } = useMutation(getToken, {
    onError: (err) => {
      console.log("err", err);
      setError(err.response.data);
    },
    onSuccess: () => {
      nav("/orders");
    },
  });

  const submit = (e) => {
    e.preventDefault();
    const result = validate({ username, familyname }, setError);

    if (!result) {
      return;
    }
    console.log("username", username);
    console.log("familyname", familyname);
    console.log("emailVerified", emailVerified);
    mutate({ username, familyname, emailVerified: emailVerified, userId });
  };
  return (
    <div className="login-container">
      <form className="login" onSubmit={submit}>
        <h2 className="login-title">Profile</h2>

        <Input
          placeholder="Enter your name..."
          callback={setUsername}
          value={username}
        />
        <Input
          value={familyname}
          placeholder="Enter your family name..."
          callback={setFamilyname}
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
      </form>
    </div>
  );
}

export default Profile;
