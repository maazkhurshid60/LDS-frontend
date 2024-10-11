import React, { useEffect, useState } from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../../schemas/legal delivery schemas/service";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"
import { standardSchema } from "../../../../schemas/legal delivery schemas/standard";
import { handleEnterKeyPress } from "../../../../utils/moveToNextFieldOnEnter";
import { getAllFilteredDataThunk, getSearchNameReducer } from "../../../../redux/slice/legalDelivery";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../../apiservices/baseUrl/baseUrl";
import { LTFormSchema } from "../../../../schemas/service forms/L&TFormSchema";
import FormatedIndexInputField from "../../../../components/InputFields/TextField/FormatedIndexInputField";
const Standard = () => {
    const accessToken = localStorage.getItem("accessToken");
    const { register, formState: { errors }, handleSubmit, control } = useForm({ resolver: zodResolver(LTFormSchema) })
    const dispatch = useDispatch()
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const [oLTIndex, setOltIndex] = useState("")


    const serviceFilterFunction = (searchData) => {

        const oSSTIndexNo = oLTIndex !== "" ? oLTIndex + "/" + currentYear : "";
        const data = {
            ...searchData, oSSTIndexNo
        }
        const sendingData = { searchIn: "standard", data }
        console.log(searchData)
        dispatch(getAllFilteredDataThunk(searchData))

    }
    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if Enter key  is pressed
            if (event.key === "Enter") {
                handleSubmit(serviceFilterFunction)();
            }
        };

        // Add event listener for keydown
        document.addEventListener("keydown", handleKeyPress);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleSubmit, serviceFilterFunction]);



    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-auto" onSubmit={handleSubmit(serviceFilterFunction)}>
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Other Std Description" error={errors.otherStdDescription} name="otherStdDescription" />
        <FormatedIndexInputField
            onKeyDown={handleEnterKeyPress} register={register} label="Index Number" error={errors.oSSTIndexNo} name="oSSTIndexNo" oltIndexValue={oLTIndex}
            onChange={setOltIndex} year={currentYear}
        />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="court" error={errors.sSDCourt} name="sSDCourt" />

        <TextField onKeyDown={handleEnterKeyPress} register={register} label="Plaintiff" error={errors.sSDPlaintiff} name="sSDPlaintiff" />
        <TextField onKeyDown={handleEnterKeyPress} register={register} label="defendant" error={errors.sSDDefendants} name="sSDDefendants" />



        <Button text="filter" />
    </form>
}

export default Standard