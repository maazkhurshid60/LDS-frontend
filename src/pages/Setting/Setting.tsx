import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomCheckBox from "../../components/CheckBox/CustomCheckBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "../../schemas/setting";
import { z } from "zod";
import { MdOutlineAdd } from "react-icons/md";
import { showModalReducer } from "../../redux/slice/showModal";
import SettingModal from "../../components/Modal/SettingModal";
import { useGetAllData } from "../../hooks/getAllDataHook/useGetAllData";

export type FormFields=z.infer<typeof settingSchema> 
const Setting = () => {
    const userInfo= useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
    const { isLoading, error, data, refetch } = useGetAllData("/setting/all-settings")
    const dispatch=useDispatch()
    const showModal=useSelector((state: RootState )=>state?.showModal.isShowModal)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({ resolver: zodResolver(settingSchema) })
        const settingFunction=(data)=>{
        console.log(data)
    }

    console.log(data)
    return (
        <>
        {showModal?<SettingModal/>:  <OutletLayout>
            <div className=" ">
                <OutletLayoutHeader heading="Settings">
                {userInfo?.roles[0]?.name === "Admin"&&<BorderButton buttonText="add" icon={<MdOutlineAdd />} isIcon onClick={()=>dispatch(showModalReducer(true))}/>}
                    {userInfo?.roles[0]?.name === "Admin" && (
                        <BorderButton buttonText="Apply Changes" onClick={handleSubmit(settingFunction)}/>
                    )}
                </OutletLayoutHeader>
                <form className="flex flex-col gap-2 mt-6">
                    {/* <Checkbox text="Deliver on Saturday" onChange={handleDeliveryDayChange} /> */}
                    {/* {data?.map((data,id)=><>
                        <CustomCheckBox name={data?.value}
                        register={register}
                        label={data?.label}
                         />
                    
                    </>)} */}
                    {/* <CustomCheckBox name="saturdayDelivery"
                        register={register}
                        label="Deliver on Saturday"
                        error={errors.saturdayDelivery?.message} />
                        <CustomCheckBox name="anyTimeDelivery"
                        register={register}
                        label="Deliver Any Time Except From 10:30 PM - 05:59 AM"
                        error={errors.anyTimeDelivery?.message} /> */}
                    {/*  <Checkbox
                        text="Deliver Any Time Except From 10:30 PM - 05:59 AM"
                        onChange={handleDeliveryTimeChange}
                    /> */}
                </form>
            </div>
        </OutletLayout>}
      
        </>
    );
};

export default Setting;
