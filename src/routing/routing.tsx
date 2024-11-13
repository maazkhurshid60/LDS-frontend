import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import AgencyLic from "../components/Result Templates/Affidavits Reports/Agencylic/MainTemplate";
import LiNonReports from "../components/Result Templates/Affidavits Reports/LiNonReports/MainTemplate";
import LTExtraNameReport from "../components/Result Templates/Affidavits Reports/LTExtraNameReport/MainTemplate";
import MarshalReport from "../components/Result Templates/Affidavits Reports/MarshalReport/MainTemplate";
import NonMilReport from "../components/Result Templates/Affidavits Reports/NonMilReports/MainTemplate";
import StandardReport from "../components/Result Templates/Affidavits Reports/StandardReport/MainTemplate";
import TransPerSlipReport from "../components/Result Templates/Affidavits Reports/TransPerSlipReport/MainTemplate";
import GPSReport from "../components/Result Templates/GPSReport/MainTemplate";
import LtServiceType from "../pages/LtServiceType/LtServiceType";
import StandardServiceType from "../pages/StandardServiceType copy/StandardServiceType";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotFoundPage from "../pages/NotFound";
import ServerDownPage from "../pages/NotFound/ServerDownPage";
import { toast } from "react-toastify";
import { getAllServerStatusApi } from "../apiservices/serverDownApi/serverDownApi";




const Routing = () => {
    // const isSiteDown = useSelector((state: RootState) => state?.navbarTracking?.isShow)

    const [isServerDown, setIsServerDown] = useState(false)

    const getAllStatus = async () => {
        try {
            const response = await getAllServerStatusApi()
            setIsServerDown(response?.data?.data[0]?.serverDownStatus)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllStatus()
    }, [])
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/serverdownpage" element={<ServerDownPage />} />

                {/* Check if isSiteDown is true and redirect to error page */}
                {isServerDown ? (
                    <>
                        <Route path="/error" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/error" replace />} />
                    </>
                ) : (
                    <>
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
                            <Route path="/administration/lt-service-type" element={<LtServiceType />} />
                            <Route path="/administration/standard-service-type" element={<StandardServiceType />} />
                            <Route path="/administration/client" element={<Client />} />
                            <Route path="/administration/server" element={<Server />} />
                            <Route path="/operations/legal-delivery" element={<LegalDelivery />} />
                            <Route path="/operations/result" element={<Result />} />
                            <Route path="/operations/service" element={<Service />} />
                            <Route path="/operations/legal-delivery/agency-license" element={<AgencyLic />} />
                            <Route path="/operations/legal-delivery/li-non-reports" element={<LiNonReports />} />
                            <Route path="/operations/legal-delivery/lT-extra-name-reports" element={<LTExtraNameReport />} />
                            <Route path="/operations/legal-delivery/marshal-reports" element={<MarshalReport />} />
                            <Route path="/operations/legal-delivery/non-mil-reports" element={<NonMilReport />} />
                            <Route path="/operations/legal-delivery/standard-reports" element={<StandardReport />} />
                            <Route path="/operations/legal-delivery/trans-per-slip-reports" element={<TransPerSlipReport />} />
                            <Route path="/operations/legal-delivery/gps-report" element={<GPSReport />} />
                        </Route>
                    </>
                )}



            </Routes>
        </BrowserRouter>
    )
}
export default Routing