import React, { useEffect, useState } from 'react'
import ToggleButton from '../../components/Toggle/ToggleButton'
import axios from 'axios'
import { baseUrl } from '../../apiservices/baseUrl/baseUrl'
import { toast } from 'react-toastify'
import Button from '../../components/Buttons/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { showNotFoundPage } from '../../redux/slice/navbarTracking'
import { getAllServerStatusApi } from '../../apiservices/serverDownApi/serverDownApi'

const ServerDownPage = () => {
    const [isServerDown, setIsServerDown] = useState(false)
    const [serverId, setServerId] = useState(false)
    const [serverStatusLength, setServerStatusLength] = useState([])

    const isSiteDown = useSelector((state: RootState) => state?.navbarTracking?.isShow)
    const dispatch = useDispatch()
    // console.log("iserverdown", serverStatusLength);

    const serverDownFunction = async () => {
        try {
            const data = {
                serverDownStatus: serverStatusLength?.length === 0 ? true : isServerDown,
                statusId: serverId
            };

            // const url = serverStatusLength?.length === 0
            //     ? `https://lds-backend-prod.onrender.com/api/v1/server-down/create`
            //     : `https://lds-backend-prod.onrender.com/api/v1/server-down/update`;
            const url = serverStatusLength?.length === 0
                ? `https://lds-backend-server.onrender.com/api/v1/server-down/create`
                : `https://lds-backend-server.onrender.com/api/v1/server-down/update`;


            const method = serverStatusLength?.length === 0 ? axios.post : axios.patch;
            const response = await method(url, data);

            // console.log("response>>>>>>>>>>>>>>>>>>>", response);
            toast.success("Server State Has Updated");
            // window.location.reload();
        } catch (error) {
            toast?.error("Server Online Issue. Try again after sometime.");
        }
    };


    const getAllStatus = async () => {
        try {
            const response = await getAllServerStatusApi()
            setIsServerDown(response?.data?.data[0]?.serverDownStatus)
            setServerId(response?.data?.data[0]?._id)
            setServerStatusLength(response?.data?.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllStatus()
    }, [])


    return (<div className="w-full bg-whiteColor flex items-center justify-center h-[100vh] ">
        <div className="w-[95%] border-[1px] border-borderColor border-solid rounded-xl text-center shadow-lgShadow py-6 px-8
                          sm:w-[65%] 
                          md:py-8 md:px-10 
                           lg:py-10 lg:px-12
                          xl:w-[35%] xl:py-12 xl:px-14">
            {/* HEADER STARTS */}
            <div className="flex flex-col items-center justify-center gap-4 mb-4">
                <h1 className="px-6 tracking-wide py-2 bg-primaryColor rounded-md 
                             inline-block text-whiteColor font-semibold text-base
                             sm:text-xl
                             lg:text-2xl ">
                    LDS
                </h1>
                <p className="capitalize font-medium text-sm md:text-lg opacity-[65%]">Down the Server</p>
            </div>
            {/* HEADER ENDS */}
            {/* FORM STARTS */}
            <div className='flex items-center justify-center'>

                <ToggleButton
                    label={"Down the Server"}
                    value={isServerDown}
                    onChange={() => setIsServerDown(!isServerDown)}
                />
            </div>

            <div className='w-[40%] m-auto mt-4'>

                <Button text='Save' onClick={serverDownFunction} />
            </div>
            {/* FORM ENDS */}
        </div>
    </div>
    )
}

export default ServerDownPage




















