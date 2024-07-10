import React, { useEffect } from "react";
import TextField from "../../../../components/InputFields/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../../schemas/legal delivery schemas/service";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Button from "../../../../components/Buttons/Button/Button"
import { standardSchema } from "../../../../schemas/legal delivery schemas/standard";
const Standard = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm({ resolver: zodResolver(standardSchema) })
      // function to get data for service filter
    const serviceFilterFunction = (data) => {
        console.log(data)
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
        <TextField register={register} label="Other Std Description" error={errors.otherStdDescription} name="otherStdDescription"   />
        <TextField register={register} label="Index Number" error={errors.indexNumber} name="indexNumber"   />
        <TextField register={register} label="court" error={errors.court} name="court"   />
        <TextField register={register} label="city" error={errors.city} name="city"   />
        <TextField register={register} label="country" error={errors.country} name="country"   />
        <TextField register={register} label="Plaintiff" error={errors.plaintiff} name="plaintiff"   />
        <TextField register={register} label="defendant" error={errors.defendant} name="defendant"   />
        <TextField register={register} label="full Name" error={errors.fullName} name="fullName"   />
        <TextField register={register} label="address" error={errors.address} name="address"   />
        <TextField register={register} label="apt" error={errors.apt} name="apt"   />
        <TextField register={register} label="zip" error={errors.zip} name="zip"   />
        
       
            <Button text="filter"/>
    </form>
}

export default Standard