import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/shared/PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/shared/Navbar";
import Home from "../pages/Home";
import Chat from "../pages/Chat";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/:roomURLcode" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
