import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Referrals from "../components/Referrals";
import NewReferral from "../components/NewReferral";

export default (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/referrals" element={<Referrals />} />
    <Route path="/referrals/new" element={<NewReferral />} />
  </Routes>
);