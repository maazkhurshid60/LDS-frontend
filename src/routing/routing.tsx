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
import { AllRoles } from "../pages/AllRoles/AllRoles";


const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                        {/* Place the /service route at the top */}
                        <Route path="/" element={<Navigate to="/operations/service" />} />
                    <Route path="/administration/service-results" element={<ServiceResult />} />
                    <Route path="/administration/service-type" element={<ServiceType />} />
                    <Route path="/administration/user" element={<User />} />
                    <Route path="/administration/device" element={<Devices />} />
                    <Route path="/administration/setting" element={<Setting />} />
                    <Route path="/administration/holiday" element={<Holiday />} />
                    <Route path="/administration/client" element={<Client />} />
                    <Route path="/administration/server" element={<Server />} />
                    <Route path="/operations/legal-delivery" element={<LegalDelivery />} />
                    <Route path="/operations/result" element={<Result />} />
                    <Route path="/operations/service" element={<Service />} />
                    {/* <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/all-roles" element={<AllRoles />} /> */}


                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Routing