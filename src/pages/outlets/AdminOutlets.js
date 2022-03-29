import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../extra/NotFound";
import Dashboard from "../Admin/Dashboard";
import Bitecases from "../Admin/Bitecases";
import Appointments from "../Admin/Appointments";
import Inventory from "../Admin/Inventory";
import Analytics from "../Admin/Analytics";
import Announcements from "../Admin/Announcement";
import Accounts from "../Admin/Accounts";

import ViewBiteCase from "../Admin/AdminCRUD/ViewBiteCase";
import VaxCertificate from "../Admin/AdminCRUD/VaxCertificate";

const AdminOutlets = () => {
  const { loading, isAuthenticated, role } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && isAuthenticated && role === "admin" ? (
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/bitecases" element={<Bitecases />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/auth" element={<Accounts />} />
          <Route path="/bitecase/get/:id" element={<ViewBiteCase />} />
          <Route path="/bitecase/print/:id" element={<VaxCertificate />} />
        </Routes>
      ) : (
        isAuthenticated === false && <Navigate to={"/login-admin"} />
      )}
    </>
  );
};

export default AdminOutlets;
