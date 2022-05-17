import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../extra/NotFound";

import SuperDash from "../Super/Dashboard";
import Clinic from "../Super/Clinic";
import SuperAdmins from "../Super/SuperAdmins";
import Analytics from "../Super/Analytics";
import Expo from "../Super/Exposures";
/* import Announcements from "../Admin/Announcement";
import ARIS from "../../components/Layouts/ARIS_Admin";
 */
const SuperAdminOutlet = () => {
  const { loading, isAuthenticated, role } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && isAuthenticated && role === "superadmin" ? (
        <Routes>
          <Route index element={<SuperDash/>} />         
          <Route path="/analytics" element={<Analytics />} />
           {/*<Route path="/announcements" element={<Announcements />} />
          <Route path="/ARIS" element={<ARIS />} /> */}          
          <Route path="*" element={<NotFound />} />
            <Route path="/clinics" element={<Clinic />} />
            <Route path="/admins" element={<SuperAdmins />} />
            <Route path="/exposures" element={<Expo />} />
        </Routes>
      ) : loading === false && isAuthenticated && role !== "superadmin" ? (
        <Navigate to={"/login"} />
      ) : (
        isAuthenticated === false && <Navigate to={"/login"} />
      )}
    </>
  );
};

export default SuperAdminOutlet;