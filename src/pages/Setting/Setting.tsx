import React, { useState } from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomCheckBox from "../../components/CheckBox/CustomCheckBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "../../schemas/setting";
import { z } from "zod";

export type FormFields=z.infer<typeof settingSchema> 
const Setting = () => {
    const userInfo = useSelector((state: RootState) => state?.userDetail);
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({ resolver: zodResolver(settingSchema) })
        const settingFunction=(data)=>{
        console.log(data)
    }
    return (
        <OutletLayout>
            <div className=" ">
                <OutletLayoutHeader heading="Settings">
                    {userInfo?.role === "admin" && (
                        <BorderButton buttonText="Apply Changes" onClick={handleSubmit(settingFunction)}/>
                    )}
                </OutletLayoutHeader>
                <form className="flex flex-col gap-2 mt-6">
                    {/* <Checkbox text="Deliver on Saturday" onChange={handleDeliveryDayChange} /> */}
                    <CustomCheckBox name="saturdayDelivery"
                        register={register}
                        label="Deliver on Saturday"
                        error={errors.saturdayDelivery?.message} />
                        <CustomCheckBox name="anyTimeDelivery"
                        register={register}
                        label="Deliver Any Time Except From 10:30 PM - 05:59 AM"
                        error={errors.anyTimeDelivery?.message} />
                    {/*  <Checkbox
                        text="Deliver Any Time Except From 10:30 PM - 05:59 AM"
                        onChange={handleDeliveryTimeChange}
                    /> */}
                </form>
            </div>
        </OutletLayout>
    );
};

export default Setting;
