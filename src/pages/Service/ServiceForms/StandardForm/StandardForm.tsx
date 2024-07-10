import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { standardFormSchema } from "../../../../schemas/service forms/standardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "../../../../components/CheckBox/CustomCheckBox"
import TextField from "../../../../components/InputFields/TextField/TextField"
import Dropdown from "../../../../components/dropdown/Dropdown";
export type FormFields = z.infer<typeof standardFormSchema>
const StandardForm = () => {
    const userOptions = [{ value: "ZainCalzoni", label: "Zain Calzoni" }, { value: "cooperCulhane", label: "Cooper Culhane" }]
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormFields>({ resolver: zodResolver(standardFormSchema) })
    const StandardServiceTypeFunction = (data) => {
        console.log(data)
    }
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                handleSubmit(StandardServiceTypeFunction)()
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleSubmit, StandardServiceTypeFunction])
    return <div className="w-[100%]">
        <div className="w-full">
            <form onSubmit={handleSubmit(StandardServiceTypeFunction)} className="w-full">
                {/* STANDARD SERVICE TYPE STARTS */}
                <div className="w-full">
                    <h1 className="font-semibold text-xl mb-4">Standard Service Type</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} name="summons" label="summons" error={errors.summons?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">

                            <CheckBox register={register} name="judicialSubpoena" label="Judicial Subpoena" error={errors.judicialSubpoena?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} name="summonsnotice" label="Summons w/notice" error={errors.summonsnotice?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} name="judicialSubpoenaDecestecum" label="Judicial Subpoena Decestecum" error={errors.judicialSubpoenaDecestecum?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Summons w/verified complaint" name="summonsVerifiedComplaint" error={errors.summonsVerifiedComplaint?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Judicial Subpoena & Judicial Subpoena Decestecum" name="judicialSubpoenaAndDecestecum" error={errors.judicialSubpoenaAndDecestecum?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Summons w/notice & verified complaint" name="verifiedComplaint" error={errors.verifiedComplaint?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Notice of Petition & Petition" name="noticeOfPetition" error={errors.noticeOfPetition?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Summons w/endorsed complaint" name="endorsedComplaint" error={errors.endorsedComplaint?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="Order to show cause" name="orderToShowCause" error={errors.orderToShowCause?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="citation" name="citation" error={errors.citation?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <CheckBox register={register} label="other Standard" name="otherStandard" error={errors.otherStandard?.message} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.indexNo} name="indexNo" label="index No" />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <TextField register={register} error={errors.otherStandardDescription} name="otherStandardDescription" label="other Standard Description" />
                        </div>
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
                    <h1 className="font-semibold text-xl mb-4 ">Serve To</h1>
                    <div className="flex items-start w-full flex-wrap gap-x-8 gap-y-4 justify-start">
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <Controller name="createdByName" control={control} render={({ field }) => (
                                <Dropdown
                                    options={userOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="created By" error={errors.createdByName?.message as string}
                                />
                            )} />
                        </div>
                        <div className="w-[100%] md:w-[46%] lg:w-[30%] ">
                            <Controller name="updatedByName" control={control} render={({ field }) => (
                                <Dropdown
                                    options={userOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="updated By" error={errors.updatedByName?.message as string}
                                />
                            )} />
                        </div>
                    </div>
                </div>
                {/* END OF FORM ENDS */}
            </form>
        </div>
    </div>
}

export default StandardForm