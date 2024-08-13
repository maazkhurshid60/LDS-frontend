import React, { useState, useEffect } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "../../schemas/setting";
import { z } from "zod";
import { MdOutlineAdd } from "react-icons/md";
import { showModalReducer } from "../../redux/slice/showModal";
import SettingModal from "../../components/Modal/SettingModal";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";
import { toast } from "react-toastify";
import { updateSettingApi } from "../../apiservices/settingApi/settingApi";
import { showSpinnerReducer } from "../../redux/slice/spinner";
import { DataLoader } from "../../components/Loader/DataLoader";
import GPSReport from "../../components/Result Templates/GPSReport/MainTemplate";

const Setting = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const { isLoading, error, data, refetch } = useGetAllData("/setting/all-settings");
    const [checkedValues, setCheckedValues] = useState({}); // Object to store {id: { id, value }} pairs
    const [mergedData, setMergedData] = useState([]);
    const dispatch = useDispatch();
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    // Merge function to update data with checkedValues
    const mergeData = () => {
        const updatedData = data?.map(item => {
            if (checkedValues[item?._id] !== undefined) {
                return { ...item, value: checkedValues[item?._id]?.value };
            }
            return item;
        });
        setMergedData(updatedData);
    };

    const settingFunction = async () => {
        dispatch(showSpinnerReducer(true))
        // const updatedData=mergeData
        // You can now process the mergedData for further actions like saving them
        try {
            const response = await updateSettingApi(mergedData)
            refetch()
            toast.success(`${response?.data?.message}`)
        } catch (error) {
            toast.error("Cannot updated. Try Later")
        } finally {
            dispatch(showSpinnerReducer(false))

        }
    };

    const updateSingleSettingFunction = (id, value) => {
        setCheckedValues((prev) => ({
            ...prev,
            [id]: { id, value: !value } // Toggle the value
        }));
    };

    useEffect(() => {
        mergeData();
    }, [checkedValues]);


    if (isLoading) return <DataLoader text="Settings" />;

    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <>
            {showModal ? <SettingModal /> :
                <OutletLayout>
                    <div className=" ">
                        <OutletLayoutHeader heading="Settings">
                            {userInfo?.roles[0]?.name === "Admin" && (
                                <BorderButton buttonText="Apply Changes" onClick={handleSubmit(settingFunction)} disabled={isSubmitting} />
                            )}
                        </OutletLayoutHeader>
                        <form className="flex flex-col gap-2 mt-6">
                            {data?.map((setting) => {
                                const isChecked = checkedValues[setting._id]?.value ?? setting.value;
                                return (
                                    <div key={setting._id}>
                                        <input
                                            type="checkbox"
                                            id={setting.label}
                                            {...register(setting.label)}
                                            checked={isChecked}
                                            onChange={() => updateSingleSettingFunction(setting._id, isChecked)}
                                        />
                                        <label
                                            htmlFor={setting.label}
                                            className="text-sm sm:font-semibold capitalize ml-3"
                                        >
                                            {setting.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                        {/* <GPSReport/> */}
                </OutletLayout>}
        </>
    );
};

export default Setting;
