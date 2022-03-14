import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { aris_theme } from "./assets/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAuthDetails } from "./redux/slices/UserSlices";
// import { io } from "socket.io-client";
import ForgotPasswordUser from "./pages/Auth/ForgotPasswordUser";
import ResetPasswordUser from "./pages/Auth/ResetPassword_User";
// import { GetAuthDetails } from "./redux/slices/AdminSlices";

import LoginUser from "./pages/Auth/Login_User";
import Home from "./pages/Home";

// import Feedback from "./pages/Index/Feedback";
import RegisterUser from "./pages/Auth/Register_User";
import NotFound from "./pages/extra/NotFound";
import UserOutlet from "./pages/outlets/UserOutlet";
import AdminOutlets from "./pages/outlets/AdminOutlets";
import LoginAdmin from "./pages/Auth/Login_Admin";
// import Footer from "./components/Layouts/Footer";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetAuthDetails());
    console.log(process.env.REACT_APP_API_HOST);
    return () => {};
  }, [dispatch]);
  return (
    <>
      {!loading && (
        <ThemeProvider theme={aris_theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/forgot-password" element={<ForgotPasswordUser />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPasswordUser />}
              />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/admin/*" element={<AdminOutlets />} />
              <Route path="/user/*" element={<UserOutlet />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
