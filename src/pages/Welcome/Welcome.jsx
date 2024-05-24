import React from "react";
import { useNavigate } from "react-router-dom";
import "./dist/Welcome.css";
import Icon from "../../components/svg-icon/Icon";

export default function Welcome() {
  const nav = useNavigate();
  const navToOrders = () => nav("/orders");

  return (
    <div className="welcome-container">
      <div className="welcome">
        <div className="welcome-left-part">
          <h2 className="welcome-title">Manage your orders now</h2>
          <p className="welcome-info">
            You can easily do all operations with orders if you are authrized:
            create, read, update and delete. To start simply click on Start
            button now!
          </p>
          <div className="btn-container">
            <button className="welcome-btn" onClick={navToOrders}>
              Track orders
            </button>
            <div className="icon-container">
              <Icon
                iconName={"right-arrow"}
                width="32"
                fill="#fff"
                stroke="#fff"
                viewBox="0 0 32 32"
              />
            </div>
          </div>
        </div>
        <div className="welcome-right-part">
          <img
            src={process.env.PUBLIC_URL + "/img/manage-orders.png"}
            alt="manage-orders"
            className="welcome-image"
          />
        </div>
      </div>
    </div>
  );
}
