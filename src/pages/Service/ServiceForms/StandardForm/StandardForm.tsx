import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { standardFormSchema } from "../../../../schemas/service forms/standardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import TextField from "../../../../components/InputFields/TextField/TextField"
import Dropdown from "../../../../components/dropdown/Dropdown";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addServiceFormThunk, getAllServiceFormThunk, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import Hints from "../../../Result/Hints/Hints";
import Button from "../../../../components/Buttons/Button/Button";
export type FormFields = z.infer<typeof standardFormSchema>
const StandardForm = () => {
    const userOptions = [{ value: "ZainCalzoni", label: "Zain Calzoni" }, { value: "cooperCulhane", label: "Cooper Culhane" }]
    const { register, handleSubmit, formState: { errors }, control,setValue,reset } = useForm<FormFields>({ resolver: zodResolver(standardFormSchema) })
    const { data: standardServiceTypesData } = useGetAllData("/standard-service-type/all-standard-service-types");
    const [checkedName, setCheckedName] = useState<string | null>();
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const userData = useSelector((state: RootState) => state?.userDetail)
    const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    console.log("LTDATA",LTData)
    const dispatch=useDispatch()
    const handleCheckboxChange = (id: string) => {
        setCheckedName(id);
    };
    const StandardServiceTypeFunction = (data) => {
        
        const serviceFormData:any = allServiceFormData[0];
        const standardServiceDetail={court:data?.court,defendants:data?.defendants,plaintiff:data?.plaintiff,country:data?.country,
                                    serveTo:{firstName:data?.firstName,address:data?.address,city:data?.city,state:data?.state,apt:data?.apt,zip:data?.zip}
                                    }
        const finalData = { ...serviceFormData, standardServiceDetail };
        const LTDataa:any=LTData
        if(isNewFormAdding === true){
        const updatedData={...LTDataa,standardServiceDetail,standardServiceType:checkedName,jobNo:parseInt(LTData?.jobNo),caseNo:parseInt(LTData?.caseNo)}

            console.log("adding data to add api", updatedData);
            dispatch(addServiceFormThunk(updatedData))

        }else{
        const updatedData={...LTDataa,standardServiceDetail,serviceFormId:allServiceFormData[0]?._id,standardServiceType:checkedName}

            console.log("updating data to update api", updatedData);
            dispatch(updateServiceFormThunk(updatedData))

        }
    }

    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (!isNewFormAdding) {
        setValue("zip",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.zip)
        setValue("apt",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.apt)
        setValue("state",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.state)
        setValue("city",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.city)
        setValue("address",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.address)
        setValue("firstName",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.serveTo?.firstName)
        setValue("country",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.country)
        setValue("plaintiff",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.plaintiff)
        setValue("defendants",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.defendants)
        setValue("court",allServiceFormData[serviceFormIndex]?.standardServiceDetail?.court)
        setCheckedName(allServiceFormData[serviceFormIndex]?.standardServiceType?._id)
    }
    }, [allServiceFormData,serviceFormIndex,setValue])
   
 // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
 useEffect(() => {
    if (isNewFormAdding) {
        reset();
        setCheckedName(null);
    }
}, [isNewFormAdding, reset]);
 // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
 useEffect(() => {
    dispatch(getAllServiceFormThunk())
    // setValue("jobNo",allServiceFormData[0]?.jobNo)
}, [])
    return <div className="w-[100%]">
        <div className="w-full">
            <form  className="w-full">
                   {/* STANDARD SERVICE TYPE STARTS */}
                <div className="w-full">
                    <h1 className="font-semibold text-xl mb-4">Standard Service Type</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        {standardServiceTypesData?.map((data, index) => {
                            return <div className="w-[100%] md:w-[46%] lg:w-[30%]" key={index}>
                                <CheckBox
                                    register={register}
                                    name={data?.name}
                                    label={data.name}
                                    checked=  {checkedName === data._id}
                                    onChange={() => handleCheckboxChange(data._id)}
                                />
                            </div>
                        })}
                    </div>
                </div>
                {/* STANDARD SERVICE TYPE ENDS */}
                {/* STANDARD SERVICE DETAIL STARTS */}
                <div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Standard Service Detail</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.court} name="court" label="court" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.defendants} name="defendants" label="defendants" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.plaintiff} name="plaintiff" label="plaintiff" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.country} name="country" label="country" />
                        </div>
                    </div>
                </div>
                {/* STANDARD SERVICE DETAIL ENDS */}
                {/* SERVE TO STARTS */}
                <div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Serve To</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.firstName} name="firstName" label="first name" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.address} name="address" label="address" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.city} name="city" label="city" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.state} name="state" label="state" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.apt} name="apt" label="Apt#/Desc" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.zip} name="zip" label="zip" />
                        </div>
                    </div>
                </div>
                {/*SERVE TO ENDS */}
                {/* END OF FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold text-xl mb-4 ">End of Form</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                        <label className="text-sm font-semibold capitalize">created By</label>
                        <p>{userData?.userDetails?.user?.firstName} {userData?.userDetails?.user?.lastName}</p>
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <label className="text-sm font-semibold capitalize">updated By</label>
                            <p>{userData?.userDetails?.user?.firstName} {userData?.userDetails?.user?.lastName}</p>
                            
                        </div>
                    </div>
                </div>
                {/* END OF FORM ENDS */}
                {/* ADDING MAILING ENDS */}
                <div className="w-full flex justify-end flex-row mt-6" >
                    <div className="w-[21%] " >
                        <Button text={`${isNewFormAdding?"add Data":"Update Data"}`} onClick={handleSubmit(StandardServiceTypeFunction)}/>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default StandardForm