import React from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdMonitor, MdAdd } from "react-icons/md";
import Hints from "./Hints/Hints";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { resultFormSchema } from "../../schemas/resultFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/InputFields/TextField/TextField";
import CheckBox from "../../components/CheckBox/CustomCheckBox";
import Dropdown from "../../components/dropdown/Dropdown";
import { Recepient, clientId, delivery, result, serverId, svcData } from "../../constdata/ResultForm";

export type FormFields = z.infer<typeof resultFormSchema>
const Result = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormFields>({ resolver: zodResolver(resultFormSchema) })
    return <div className=" h-[72vh] overflow-y-scroll bg-whiteColor p-2 sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow">
        <OutletLayoutHeader heading="Result Form">
        <BorderButton buttonText="add" icon={<MdAdd />} isIcon />

            <BorderButton buttonText="edit" icon={<MdOutlineEdit />} isIcon />
            <BorderButton buttonText="submit" icon={<MdOutlineDone />} isIcon />
            <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon />
            <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon />
            <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon />
            <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon />
            <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon />
            <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon />
        </OutletLayoutHeader>
        <div className="mt-8">
            <div>
                <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl">Hints</h1>
                <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                    <Hints keyName="Esc" label="finish" />
                    <Hints keyName="f7 + f10" label="find" />
                </div>
            </div>
            <form >
                {/* QUERY INFORMATION (L&T) FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">Query Information (L&T)</h1>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="full Name" error={errors.fullName} name="fullName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="index no" error={errors.indexNo} name="indexNo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="address" error={errors.address} name="address" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Business Name" error={errors.bussinessName} name="bussinessName" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Input Date" error={errors.dateEntered} name="dateEntered" type="date" />
                        </div>
                    </div>
                </div>
                {/* QUERY INFORMATION (L&T) FORM ENDS */}
                {/* QUERY INFORMATION (STANDARD) FORM STARTS */}
                <div className="mt-6">
                    <h1 className="font-semibold  mb-4 text-base
                md:text-md
                lg:text-xl">Query Information (Standard)</h1>

                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="save to" error={errors.saveTo} name="saveTo" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="plaintiff" error={errors.plainTiff} name="plainTiff" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="defedants" error={errors.defedants} name="defedants" />
                        </div>
                    </div>
                </div>
                {/* QUERY INFORMATION (STANDARD) FORM ENDS */}
                {/* SHOW RESULT  FORM STARTS */}
                <div className="mt-6">
                    <div>
                        <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl ">Hints</h1>
                        <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                            <Hints keyName="Esc" label="finish" />
                            <Hints keyName="f7 + f10" label="find" />
                            <Hints keyName="f4" label="ditto field" />
                        </div>

                    </div>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start mt-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Result Input Date" error={errors.inputResultDateEntered} name="inputResultDateEntered" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="svcType" control={control} render={({ field }) => (
                                <Dropdown
                                    options={svcData}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Svc Type" error={errors.svcType?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="clientId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={clientId}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="client Id" error={errors.clientId?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Job" error={errors.jobNo} name="jobNo" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="serverId" control={control} render={({ field }) => (
                                <Dropdown
                                    options={serverId}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="server Id" error={errors.serverId?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="results" control={control} render={({ field }) => (
                                <Dropdown
                                    options={result}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="result" error={errors.results?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Date of service" error={errors.dateService} name="dateService" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Time of service" error={errors.timeService} name="timeService" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="1st date Attempt" error={errors.date1stAttempt} name="date1stAttempt" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="1st time Attempt" error={errors.time1stAttempt} name="time1stAttempt" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="2nd date Attempt" error={errors.date2ndAttempt} name="date2ndAttempt" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="2nd time Attempt" error={errors.time2ndAttempt} name="time2ndAttempt" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="3rd date Attempt" error={errors.date3rdAttempt} name="date3rdAttempt" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="3rd time Attempt" error={errors.time3rdAttempt} name="time3rdAttempt" type="time" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="L&T Served" error={errors.served} name="served"/>
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="L&T Not Served" error={errors.notServed} name="notServed"/>
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="deliveredTo" control={control} render={({ field }) => (
                                <Dropdown
                                    options={delivery}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="delivered To" error={errors.deliveredTo?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <Controller name="corporateRecipient" control={control} render={({ field }) => (
                                <Dropdown
                                    options={Recepient}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Corporate Recipient" error={errors.corporateRecipient?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="recipient Title" error={errors.recipientTitle} name="recipientTitle"/>
                        </div>
                    </div>
                </div>
                {/* SHOW RESULT  FORM ENDS */}
                {/* DESCRIPTION FORM STARTS */}
                <div className="w-full mt-6 border-[1px] border-solid border-borderColor rounded-lg">
                    <h1 className="px-6 py-2 bg-cyanColor rounded-t-lg text-whiteColor font-semibold text-lg">Description</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start px-8 py-4">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="door" error={errors.door} name="door" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="door Locks" error={errors.doorLocks} name="doorLocks" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="entry" error={errors.entry} name="entry" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="wall" error={errors.wall} name="wall" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="floor" error={errors.floor} name="floor" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="lock" error={errors.lock} name="lock" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <CheckBox register={register} label="otherDescription" error={errors.otherDescription?.message} name="otherDescription" />
                        </div>
                    </div>
                </div>
                {/* DESCRIPTION FORM ENDS */}
                {/* OTHER  FORM STARTS */}
                <div className="mt-6">
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start ">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Other Identifying Features" error={errors.features} name="features" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Date of Mailing" error={errors.dateMailing} name="dateMailing" type="date" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%]">
                            <TextField register={register} label="Notary Date" error={errors.dateNatory} name="dateNatory" type="date" />
                        </div>
                    </div>

                    <h1 className="font-semibold text-lg mt-4">
                        Do not Proceed Past This Line
                    </h1>
                </div>
                {/* OTHER  FORM ENDS */}

            </form>
        </div>
    </div>
}
export default Result