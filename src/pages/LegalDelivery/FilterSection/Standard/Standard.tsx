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
const Standard = () => {
    const accessToken = localStorage.getItem("accessToken");
    const { register, formState: { errors }, handleSubmit, control } = useForm({ resolver: zodResolver(standardSchema) })
    const dispatch = useDispatch()

      // function to get data for service filter
    //   const serviceFilterFunction=async(searchData)=>{           
    //         try {
    //             const response = await axios.get(`${baseUrl}/legal-delivery/search`, {
    //                 headers: { "Authorization": `Bearer ${accessToken}` },
    //                 params: {
    //                     searchIn: searchData?.searchIn,
    //                     data: searchData?.data,
    //                 },
                  
    //             })
    //             console.log(response)
    //             return response?.data?.data
    //         } catch (error) {
    //             console.log(error)
    //             throw new Error(error)
    //         }}
      
    const serviceFilterFunction = (searchData) => {
       
            const indexNumber = isNaN(parseInt(searchData?.indexNumber)) ? "" : parseInt(searchData?.indexNumber);
            const data = {
                ...searchData, indexNumber 
            }
            const sendingData = { searchIn: "standard", data }
            dispatch(getAllFilteredDataThunk(sendingData))
            dispatch(getSearchNameReducer("standard"))

        
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



    return <form className="flex flex-col items-start gap-y-3 overflow-y-auto h-[70vh]" onSubmit={handleSubmit(serviceFilterFunction)}>
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="Other Std Description" error={errors.otherStdDescription} name="otherStdDescription"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="Index Number" error={errors.indexNumber} name="indexNumber"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="court" error={errors.court} name="court"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="city" error={errors.city} name="city"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="country" error={errors.country} name="country"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="Plaintiff" error={errors.plaintiff} name="plaintiff"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="defendant" error={errors.defendant} name="defendant"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="full Name" error={errors.fullName} name="fullName"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="address" error={errors.address} name="address"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="apt" error={errors.apt} name="apt"   />
        <TextField onKeyDown={handleEnterKeyPress}  register={register} label="zip" error={errors.zip} name="zip"   />
        
       
            <Button text="filter"/>
    </form>
}

export default Standard