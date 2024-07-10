import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/authentication/Login";
import ServiceResult from "../pages/ServiceResult/ServiceResult";
import ServiceType from "../pages/ServiceType/ServiceType";
import Layout from "../layout/Layout";
import User from "../pages/User/User";
import Setting from "../pages/Setting/Setting";
import Holiday from "../pages/Holiday/Holiday";
import Client from "../pages/Client/Client";
import Server from "../pages/Server/Server";
import LegalDelivery from "../pages/LegalDelivery/LegalDelivery";
import Result from "../pages/Result/Result"
import Service from "../pages/Service/Service"
import Devices from "../pages/Devices/Devices";
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                        {/* Place the /service route at the top */}
                        <Route path="/" element={<Navigate to="/service" />} />
                    <Route path="/service-result" element={<ServiceResult />} />
                    <Route path="/service-type" element={<ServiceType />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/device" element={<Devices />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/holiday" element={<Holiday />} />
                    <Route path="/client" element={<Client />} />
                    <Route path="/server" element={<Server />} />
                    <Route path="/legal-delivery" element={<LegalDelivery />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/service" element={<Service />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Routing