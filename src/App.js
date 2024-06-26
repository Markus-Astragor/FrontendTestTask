import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddOrder from "./pages/Control/AddOrder";
import EditOrder from "./pages/Control/EditOrder";
import Profile from "./pages/Profile/Profile";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<Orders userDetails={user} />} path="/orders" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Profile setUser={setUser} />} path="/profile" />
        <Route element={<AddOrder />} path="/orders/add" />
        <Route element={<EditOrder />} path="/orders/edit/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
