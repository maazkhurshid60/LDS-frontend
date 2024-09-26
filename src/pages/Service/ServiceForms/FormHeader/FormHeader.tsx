import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formHeaderSchema } from "../../../../schemas/service forms/L&TFormSchema";
import { z } from "zod";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import Dropdown from "../../../../components/dropdown/Dropdown";
import { moveToStandardFormReducer, savedFormHeaderDataReducer, savedLTFormDataReducer, updateServiceFormThunk } from "../../../../redux/slice/serviceForm";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllData } from "../../../../hooks/getAllDataHook/useGetAllData";
import { RootState } from "../../../../redux/store";
import { getFormMailAddress } from "../../../../redux/slice/mailingAdresses";
import Hints from "../../../Result/Hints/Hints";

export type FormFields = z.infer<typeof formHeaderSchema>
const FormHeader = () => {
    const { register, formState: { errors }, control, handleSubmit, setValue, reset, getValues, watch } = useForm<FormFields>({ resolver: zodResolver(formHeaderSchema) })
    const { data: clientData } = useGetAllData("/client/all-clients");
    const { data: serviceTypeData } = useGetAllData("/service-type/all-service-types");
    const savedLTData = useSelector((state: RootState) => state.serviceForm.savedFormHeaderData)
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const clientFilteredOptions = clientData?.filter((data, id) => { return data?.isActive })
    const clientIdOptions = clientFilteredOptions?.map((data, id) => { return { value: data?._id, label: data?.code } })
    const getSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === savedLTData?.clientId && { value: data?._id, label: data?.fullName })
    const serviceTypeOptions = serviceTypeData?.map((data, id) => { return { value: data?._id, label: data?.serviceTypeCode } })
    const getSelectedServiceTypeOption = serviceTypeOptions?.find((data, index) => data?.value === savedLTData?.serviceType && { value: data?._id, label: data?.fullName })
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const dispatch = useDispatch()
    const [jobNo, setJobNo] = useState<any>()
    const getExistingSelectedClientoption = clientIdOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.clientId?._id && { value: data?._id, label: data?.fullName })
    const getExistingSelectedServiceTypeoption = serviceTypeOptions?.find((data, index) => data?.value === allServiceFormData[serviceFormIndex]?.serviceType?._id && { value: data?._id, label: data?.fullName })

    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const lastServiceFormIndex = allServiceFormData?.length - 1

    const submitFormHeaderFunction = (data) => {
        const headerFormData = {
            jobNo: parseInt(jobNo),
            inputDate: data?.inputDate,
            clientId: data?.clientId,
            serviceType: data?.serviceType,
            caseNo: data?.caseNo,
            caption: data?.caption,
        }
        if (!isNewFormAdding) {

            dispatch(savedFormHeaderDataReducer(headerFormData))

        } else {

            dispatch(savedLTFormDataReducer(headerFormData))
            dispatch(moveToStandardFormReducer("Standard"))

        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey && event.key === 's') || event.key === 'Escape' || event.key === 'F10') {
                event.preventDefault();
                handleSubmit(submitFormHeaderFunction)(); // Call handleSubmit to pass form data
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit]);


    // handleMoveToStandardForm
    const handleMoveToStandardForm = (value) => {
        const { clientId, inputDate, caseNo, caption, serviceType } = getValues();
        const headerData = { jobNo, inputDate, clientData, caseNo, caption, serviceType }
        if (!inputDate || !caseNo || !clientId) {
            // Show error message if either field is empty
            setValue("serviceType", "");
            toast.error("Input Date,case No ,clientId are required!");
            return;
        }
        const data = serviceTypeOptions?.find(data => data?.value === value)?.label
        if (data === "Standard") {

            handleSubmit(submitFormHeaderFunction)();
            dispatch(moveToStandardFormReducer(data))
            dispatch(savedFormHeaderDataReducer(headerData))

        }

    }


    useEffect(() => {

        if (!isNewFormAdding) {
            const currentData = allServiceFormData[serviceFormIndex];
            const data = allServiceFormData[serviceFormIndex]?.mailingAddresses
            const id = allServiceFormData[serviceFormIndex]?._id
            dispatch(getFormMailAddress({ data, id }))

            if (currentData) {
                // Set form values
                setValue("clientId", getExistingSelectedClientoption?.value);
                setValue("serviceType", getExistingSelectedServiceTypeoption?.value);
                setJobNo(JSON.stringify(currentData?.jobNo));
                setValue("inputDate", currentData?.inputDate);
                setValue("caption", currentData?.caption);

                setValue("caseNo", JSON.stringify(currentData?.caseNo));

            } else {
                toast.warning("No current data found for the form index.");
            }
        }
        else {
            if (savedLTData?.inputDate) {
                setValue("inputDate", savedLTData?.inputDate);

            }
            else {

                const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
                setValue("inputDate", currentDate);
            }

            setValue("clientId", getSelectedClientoption?.value);
            setValue("serviceType", getSelectedServiceTypeOption?.value);
            setValue("caseNo", JSON.stringify(savedLTData?.caseNo));

            setValue("caseNo", savedLTData?.caseNo);
            setValue("caption", savedLTData?.caption);
        }


    }, [allServiceFormData, serviceFormIndex, setValue, isNewFormAdding]);

    // USE EFFECT TO GET ALL SERVICE FORM DATA FROM API WHICH IS STORED IN SLICE
    useEffect(() => {
        if (isNewFormAdding) {
            reset();


        }
    }, [isNewFormAdding, reset]);
    // USE EFFECT TO CLEAR THE INPUT FIELDS ON NEW DATA ENTRY
    useEffect(() => {
        reset()
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        setValue("inputDate", currentDate);
        if (allServiceFormData[lastServiceFormIndex]?.jobNo && parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) >= 1 && isNewFormAdding) {
            setJobNo(parseInt(allServiceFormData[lastServiceFormIndex]?.jobNo) + 1);
        } else if (savedLTData?.jobNo !== undefined) {
            setJobNo(savedLTData.jobNo);
        }
        else {
            if (allServiceFormData?.length > 0) {
                setJobNo(parseInt(allServiceFormData[0]?.jobNo))
            } else {
                setJobNo(1)
            }
        }
    }, [isNewFormAdding])

    return (
        <>
            <form action="" onSubmit={handleSubmit(submitFormHeaderFunction)}>
                <div className="flex items-center justify-between flex-row-reverse	">
                    <Hints label="To Save / Update L&T Data" keyName="Ctrl + S / ESC" />
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        {jobNo &&
                            <div className="flex flex-col w-full items-start gap-1">
                                <label className=" font-normal sm:font-semibold text-xl capitalize">Job No <span>{jobNo}</span></label>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 mt-2 justify-start">

                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Input date" error={errors.inputDate} name="inputDate" type="date" required />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <Controller name="clientId" control={control} render={({ field }) => (
                            <Dropdown
                                options={clientIdOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="Client id" error={errors.clientId?.message as string}
                                required
                            />
                        )} />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="case No" error={errors.caseNo} name="caseNo" required />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <Controller name="serviceType" control={control} render={({ field }) => (
                            <Dropdown
                                options={serviceTypeOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="service type"
                                error={errors.serviceType?.message as string}
                                onValueChange={(value) => handleMoveToStandardForm(value)} // Update state
                                required

                            />
                        )} />
                    </div>

                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField onKeyDown={handleEnterKeyPress} register={register} label="caption" error={errors.caption} name="caption" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormHeader;
