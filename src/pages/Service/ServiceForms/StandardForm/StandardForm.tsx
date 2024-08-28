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
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { toast } from "react-toastify";
export type FormFields = z.infer<typeof standardFormSchema>
const StandardForm = () => {
    const userOptions = [{ value: "ZainCalzoni", label: "Zain Calzoni" }, { value: "cooperCulhane", label: "Cooper Culhane" }]
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset } = useForm<FormFields>({ resolver: zodResolver(standardFormSchema) })
    const { data: standardServiceTypesData } = useGetAllData("/standard-service-type/all-standard-service-types");
    const [checkedName, setCheckedName] = useState<string | null>();
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const getMailingAddressData = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    const getFormMailingAdress = useSelector((state: RootState) => state.mailingAdress.serviceFormMailingAdress?.mailingAdresses)

    const userData = useSelector((state: RootState) => state?.userDetail)
    const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    console.log("LTDATA", LTData)
    const dispatch = useDispatch()
    const handleCheckboxChange = (id: string) => {

        setCheckedName(id);
    };
    const StandardServiceTypeFunction = (data) => {
        console.log("standardServiceType:checkedName", checkedName)
        if (checkedName === null) return setCheckedName("empty")
        const serviceFormData: any = allServiceFormData[0];
        const standardServiceDetail = {
            sSDCourt: data?.sSDCourt, sSDDefendants: data?.sSDDefendants, sSDPlaintiff: data?.sSDPlaintiff, sSDCountry: data?.sSDCountry, oSSTIndexNo: parseInt(data?.oSSTIndexNo), oSSTDescription: data?.oSSTDescription,
            firstNameServe: data?.firstNameServe, addressServe: data?.addressServe, cityServe: data?.cityServe, stateServe: data?.stateServe, aptServe: data?.aptServe, zipServe: data?.zipServe
        }
        // const finalData = { ...serviceFormData, standardServiceDetail };

        const LTDataa = {
            jobNo: allServiceFormData[serviceFormIndex]?.jobNo,
            inputDate: allServiceFormData[serviceFormIndex]?.inputDate,
            clientId: allServiceFormData[serviceFormIndex]?.clientId?._id,
            serviceType: allServiceFormData[serviceFormIndex]?.serviceType?._id,
            caseNo: allServiceFormData[serviceFormIndex]?.caseNo,
            caption: allServiceFormData[serviceFormIndex]?.caption,
            lTServiceType: allServiceFormData[serviceFormIndex]?.lTServiceType,
            noOfAddLMailings: isNewFormAdding ? getMailingAddressData?.length : allServiceFormData[serviceFormIndex]?.noOfAddLMailings,
            mailingAddresses: isNewFormAdding ? getMailingAddressData : allServiceFormData[serviceFormIndex]?.mailingAddresses,
            lTSFirstName: data?.lTSFirstName,
            lTSBusinessName: data?.lTSBusinessName,
            lTSAddress: data?.lTSAddress,
            lTSApt: data?.lTSApt,
            lTSCity: data?.lTSCity,
            lTSState: data?.lTSState,
            lTSZip: data?.lTSZip,
            lTSDescription: data?.lTSDescription,
            oLTIndexNo: data?.oLTIndexNo,
            oLTDescription: data?.oLTDescription
        }
        if (isNewFormAdding === true) {
            const LTDataaaaa: any = LTData
            const updatedData = { ...LTDataaaaa, ...standardServiceDetail, standardServiceType: checkedName, jobNo: parseInt(LTData?.jobNo), caseNo: parseInt(LTData?.caseNo) }

            console.log("adding data to add api", updatedData);
            dispatch(addServiceFormThunk(updatedData))

        } else {
            if (LTData === null) {

                const updatedData = { ...LTDataa, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                dispatch(updateServiceFormThunk(updatedData))
            } else {
                const UpdatedLTData: any = LTData
                const updatedData = { ...UpdatedLTData, ...standardServiceDetail, serviceFormId: allServiceFormData[serviceFormIndex]?._id, standardServiceType: checkedName }
                console.log("updating data to update api", LTData, updatedData);

                dispatch(updateServiceFormThunk(updatedData))

            }


        }
    }

    // USE EFFECT TO SET VALUES OF INDEX 0 SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (!isNewFormAdding) {
            setValue("oSSTIndexNo", JSON.stringify(allServiceFormData[serviceFormIndex]?.oSSTIndexNo)),
                setValue("oSSTDescription", allServiceFormData[serviceFormIndex]?.oSSTDescription),
                setValue("zipServe", allServiceFormData[serviceFormIndex]?.zipServe)
            setValue("aptServe", allServiceFormData[serviceFormIndex]?.aptServe)
            setValue("stateServe", allServiceFormData[serviceFormIndex]?.stateServe)
            setValue("cityServe", allServiceFormData[serviceFormIndex]?.cityServe)
            setValue("addressServe", allServiceFormData[serviceFormIndex]?.addressServe)
            setValue("firstNameServe", allServiceFormData[serviceFormIndex]?.firstNameServe)
            setValue("sSDCountry", allServiceFormData[serviceFormIndex]?.sSDCountry)
            setValue("sSDPlaintiff", allServiceFormData[serviceFormIndex]?.sSDPlaintiff)
            setValue("sSDDefendants", allServiceFormData[serviceFormIndex]?.sSDDefendants)
            setValue("sSDCourt", allServiceFormData[serviceFormIndex]?.sSDCourt)
            setCheckedName(allServiceFormData[serviceFormIndex]?.standardServiceType?._id)
        }
    }, [allServiceFormData, serviceFormIndex, setValue])

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

    // THIS USEEFECT WILL BE CALLED WHEN CTRL+S IS PRESSED TO SAVE DATA INSIDE SLICE
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's' || event.key === 'Escape' || event.key === 'F10') {
                event.preventDefault();
                handleSubmit(StandardServiceTypeFunction)();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, StandardServiceTypeFunction]);

    return <div className="w-[100%]">
        <div className="w-full">
            <form className="w-full">
                <div className="w-full flex justify-end">
                    <Hints label="To Save / Update Data" keyName="Ctrl + S / ESC" />
                </div>
                {/* STANDARD SERVICE TYPE STARTS */}
                <div className="w-full">
                    <div className="flex items-center gap-x-2  mb-4">
                        <h1 className="font-semibold   mb-4 text-base
                md:text-md
                lg:text-xl">Standard Service Type <span className="text-xs font-normal capitalize">(Select only one)</span> <span className="text-redColor text-sm">*</span></h1>                    {checkedName === "empty" && <p className="text-redColor text-sm">required</p>}
                    </div>


                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        {standardServiceTypesData?.map((data, index) => {
                            return <div className="w-[100%] md:w-[46%] lg:w-[30%]" key={index}>
                                <CheckBox
                                    onKeyDown={handleEnterKeyPress}
                                    register={register}
                                    name={data?.name}
                                    label={data.name}
                                    checked={checkedName === data._id}
                                    onChange={() => handleCheckboxChange(data._id)}
                                />
                            </div>
                        })}

                    </div>

                </div>
                {/* STANDARD SERVICE TYPE ENDS */}
                {/* OTHER STANDARD SERVICE TYPE STARTS */}
                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-6" >
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other Standard Description" error={errors.oSSTDescription} name="oSSTDescription" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oSSTIndexNo} name="oSSTIndexNo" required />
                    </div>
                </div>
                {/* OTHER STANDARD SERVICE TYPE ENDS */}
                {/* STANDARD SERVICE DETAIL STARTS */}
                <div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Standard Service Detail</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDCourt} name="sSDCourt" label="Court" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDDefendants} name="sSDDefendants" label="Defendants" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDPlaintiff} name="sSDPlaintiff" label="Plaintiff" />
                        </div>
                        {/* <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.sSDCountry} name="ssDCountry" label="Country" />
                        </div> */}
                    </div>
                </div>
                {/* STANDARD SERVICE DETAIL ENDS */}
                {/* SERVE TO STARTS */}
                <div className="mt-6"><h1 className="font-semibold text-xl mb-4 ">Serve To</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.firstNameServe} name="firstNameServe" label="first name" required />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.addressServe} name="addressServe" label="address" required />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.cityServe} name="cityServe" label="city" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.stateServe} name="stateServe" label="state" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.aptServe} name="aptServe" label="Apt#/Desc" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField onKeyDown={handleEnterKeyPress} register={register} error={errors.zipServe} name="zipServe" label="zip" />
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

                        <Button text={`${isNewFormAdding ? "add Data" : "Update Data"}`} onClick={handleSubmit(StandardServiceTypeFunction)}
                            disabled={isSubmitting}

                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default StandardForm