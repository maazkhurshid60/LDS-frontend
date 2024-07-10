import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../../../components/InputFields/TextField/TextField";
import TextArea from "../../../../components/InputFields/TextArea/TextArea";
import BorderButton from "../../../../components/Buttons/BorderButton/BorderButton"
import Dropdown from "../../../../components/dropdown/Dropdown";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import { z } from "zod";
import { serviceTypeFormSchema } from "../../../../schemas/service forms/serviceTypeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdAdd } from "react-icons/io";
import AddMailing from "./AddMailing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import GetSelectedMailing from "./getSelectedMailing";
import { getMailAddress, getMailAddressAfterDeletion } from "../../../../redux/slice/mailingAdresses";
import { IoMdClose } from "react-icons/io";

export type FormFields = z.infer<typeof serviceTypeFormSchema>
const StandardTypeForm = () => {
    const clientIdOptions = [{ value: "hw", label: "HW", name: "name" }, { value: "vf", label: "VF", name: "name" }, { value: "jk", label: "JK", name: "name" }]
    const serviceTypeOptions = [{ value: "service1", label: "service 1" }, { value: "service2", label: "service 2" }, { value: "service3", label: "service 3" }]
    const mailingAddressData = useSelector((state: RootState) => state.mailingAdress.mailingAddressData)
    const getMailingAddressData = useSelector((state: RootState) => state.mailingAdress.getSelectMail)
    // const getMailingAddressData =[{value: 'vzxcvczxv', label: 'vzxcvczxv', address: 'zxvc', city: 'zvcx', state: 'vczx'}]
    const dispatch = useDispatch()
    // console.log("new mailing address", getMailingAddressData)
    const { register, formState: { errors }, control, handleSubmit,setValue } = useForm<FormFields>({ resolver: zodResolver(serviceTypeFormSchema) })
    const [isAddMail, setIsAddMail] = useState(false)
    const StandardTypeFormSubmitFunciton = (data) => {
        console.log(data)
    }

    // GET SELECTED VALUES FROM ADD MAILING DROPSOWN
    const GetSelectedMailingFunction = (optionValue) => {
        console.log("getselectedfunciton", optionValue)
        dispatch(getMailAddress(optionValue))

    }

    
    return <div className="w-[100%]">
        <div className="w-full">
            <form onSubmit={handleSubmit(StandardTypeFormSubmitFunciton)}>
                <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between">
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Job no" error={errors.job} name="job" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="Input date" error={errors.dateEntered} name="dateEntered" type="date" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <Controller name="clientId" control={control} render={({ field }) => (
                            <Dropdown
                                options={clientIdOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="Client id" error={errors.clientId?.message as string}
                            />
                        )} />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <Controller name="serviceType" control={control} render={({ field }) => (
                            <Dropdown
                                options={serviceTypeOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="service type"
                                error={errors.serviceType?.message as string}
                            />
                        )} />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="case No" error={errors.caseNo} name="caseNo" />
                    </div>
                    <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                        <TextField register={register} label="caption" error={errors.caption} name="caption" />
                    </div>
                </div>
                {/* L&T SERVICE TYPE STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold   mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Type <span className="text-xs font-normal capitalize">(Select only one)</span></h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="day3" label="3 day" error={errors.day3?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="day15" label="15 day" error={errors.day15?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="noticeOfPetition" label="Notice of Petition & Petition" error={errors.noticeOfPetition?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="day5" label="5 day" error={errors.day5?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="day3AndDay30Deptor" label="3 Day Notice & 30 Day Deptor" error={errors.day3AndDay30Deptor?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="petitionHoldover" label="Notice of Petition & Petition Holdover" error={errors.petitionHoldover?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="day10" label="10 Day" error={errors.day10?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="noticeOfTermination" label="30 Day Notice of Termination" error={errors.noticeOfTermination?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} name="otherLAndT" label="Other L&T" error={errors.otherLAndT?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Other L&T Description" error={errors.otherLAndTDescription} name="otherLAndTDescription" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Other L&T Description" error={errors.otherLAndTDescription} name="otherLAndTDescription" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="index no" error={errors.indexNo} name="indexNo" />
                        </div>
                    </div>

                </div>
                {/* L&T SERVICE TYPE ENDS */}
                {/* L&T SERVICE TYPE STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Detail</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-between ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.fullName} name="fullName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="bussiness Name" error={errors.bussinessName} name="bussinessName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="address" error={errors.address} name="address" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="apt" error={errors.apt} name="apt" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="city" error={errors.city} name="city" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="state" error={errors.state} name="state" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="zip" error={errors.zip} name="zip" />
                        </div>
                        <div className="w-[100%]">
                            <TextArea register={register} label="description" error={errors.description} name="description" />
                        </div>
                    </div>

                </div>
                {/* L&T SERVICE TYPE ENDS */}
                {/* ADDING MAILING STARTS */}
                <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        {/* <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">L&T Service Detail</h1> */}
                        <BorderButton
                            isIcon
                            buttonText="add"
                            icon={< IoMdAdd />}
                            onClick={() => setIsAddMail(true)}
                        />
                    </div>
                    {mailingAddressData?.length > 0 && <div className="w-[100%] md:w-[46%] mb-4 lg:w-[30%]">
                        <Controller name="mailingAddress" control={control} render={({ field }) => (
                            <GetSelectedMailing
                                options={mailingAddressData}
                                value={field.value}
                                onChange={field.onChange}
                                label="Client Mailing Addresses"
                                error={errors.mailingAddress?.message as string}
                                getMailFunction={GetSelectedMailingFunction}
                            />
                        )} />
                    </div>}
                    {isAddMail &&
                        <div>
                            <AddMailing />
                        </div>}

                    {/* DISPLAY ALL SELECTED MAILING STARTS */}
                    {getMailingAddressData?.length > 0 && (
                        <div className="mt-4">
                            {getMailingAddressData?.map((data: any, id) => (
                                <div key={id} className="relative border-[1px] border-solid border-borderColor/10 bg-grayColorLight/50 shadow-smShadow rounded-lg p-4 mt-2">

                                     <IoMdClose onClick={() => dispatch(getMailAddressAfterDeletion(id))} size={24} className="text-redColor p-1 bg-redColor/10 rounded-full cursor-pointer absolute top-4 right-4" />
                                  {/* SENDING DATA TO ADDMAILING COMPONENT IF DATA IS SELECTED FORM DROPDOWN */}
                                    <AddMailing data={data} id={id+1}/>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* DISPLAY ALL SELECTED MAILING ENDS */}

                </div>
                {/* ADDING MAILING ENDS */}

            </form>
        </div>
    </div>
}

export default StandardTypeForm