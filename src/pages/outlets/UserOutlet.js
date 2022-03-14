import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { setCurrentLocation } from "../../redux/slices/UserSlices";
import NotFound from "../extra/NotFound";
import Dashboard from "../Users";
import Announcements from "../Users/Announcements";
import Appointments from "../Users/Appointments";
import MyPets from "../Users/MyPets";

import MyVaccine from "../Users/MyVaccine";
import MyVaccine_Details from "../Users/MyVaccine_Details";
import PetsProfile from "../Users/PetsProfile";
import UserProfile from "../Users/UserProfile";

const UserOutlet = () => {
  const { user, loading, isAuthenticated, errors, role } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

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
          <Route path="/myvaxx/:id" element={<MyVaccine_Details />} />
          <Route path="/mypets/:id" element={<PetsProfile />} />
          <Route path="/view/announcements" element={<Announcements />} />
        </Routes>
      ) : (
        isAuthenticated === false && <Navigate to="/login" />
      )}
    </>
  );
};

export default UserOutlet;
