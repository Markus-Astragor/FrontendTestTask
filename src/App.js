import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<Orders />} path="/orders" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
