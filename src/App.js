import "react-app-polyfill/stable";
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
import Policies from "./components/Layouts/PrivacyPolicy";

// import Feedback from "./pages/Index/Feedback";
import RegisterUser from "./pages/Auth/Register_User";
import NotFound from "./pages/extra/NotFound";
import UserOutlet from "./pages/outlets/UserOutlet";
import AdminOutlets from "./pages/outlets/AdminOutlets";
import SuperAdminOutlet from "./pages/outlets/SuperAdminOutlet";
import LoginAdmin from "./pages/Auth/Login_Admin";
import VerificationPage from "./pages/Auth/VerificationPage";
import AccountVerification from "./pages/Users/AccountVerification";

/* import SuperDash from "./pages/Super/Dashboard";
import Clinic from "./pages/Super/Clinic";
import SuperAdmins from "./pages/Super/SuperAdmins"; */

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
              <Route path="/verify-user" element={<VerificationPage />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPasswordUser />}
              />
              <Route path="/login-admin" element={<LoginAdmin />} />

              <Route
                path="/account/verify/:token"
                element={<AccountVerification />}
              />
              <Route path="/policies" element={<Policies />} />
             {/*  <Route path="/superadmin" element={<SuperDash />} />
              <Route path="/clinics/" element={<Clinic />} />
              <Route path="/admins/" element={<SuperAdmins />} />
 */}
              <Route path="/admin/*" element={<AdminOutlets />} />
              <Route path="/user/*" element={<UserOutlet />} />
              <Route path="/s-admin/*" element={<SuperAdminOutlet />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
