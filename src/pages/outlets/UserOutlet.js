import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../extra/NotFound";
import Dashboard from "../Users";
import Announcements from "../Users/Announcements";
import Appointments from "../Users/Appointments";
import MyPets from "../Users/MyPets";

import MyVaccine from "../Users/MyVaccine";
import MyVaccineDetails from "../Users/MyVaccine_Details";
import PetsProfile from "../Users/PetsProfile";
import UserProfile from "../Users/UserProfile";
import Analytics from "../Users/Analytics";
import ARIS from "../../components/Layouts/ARIS_user"

const UserOutlet = () => {
  const { loading, isAuthenticated, role } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       dispatch(
  //         setCurrentLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         })
  //       );
  //     });
  //   } else {
  //   }
  //   return () => {};
  // }, []);
  return (
    <>
      {loading === false && isAuthenticated && role === "user" ? (
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/myvaxx" element={<MyVaccine />} />
          <Route path="/schedules" element={<Appointments />} />
          <Route path="/myvaxx/:id" element={<MyVaccineDetails />} />
          <Route path="/mypets/:id" element={<PetsProfile />} />
          <Route path="/view/announcements" element={<Announcements />} />
          <Route path="/reports" element={<Analytics />} />
          <Route path="/ARIS" element={<ARIS />} />
        </Routes>
      ) : (
        isAuthenticated === false && <Navigate to="/login" />
      )}
    </>
  );
};

export default UserOutlet;
