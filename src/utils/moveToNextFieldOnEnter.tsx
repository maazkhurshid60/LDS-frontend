import { toast } from "react-toastify";

// utils.js or helpers.js
export const handleEnterKeyPress = (event, selectedServiceType, nameIndex) => {

    if (nameIndex === 1) {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[nameIndex + 1]?.focus();
    }
    if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault(); // Prevent the form from submitting
        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);

        if (index === nameIndex + 2 && selectedServiceType === "residential") {
            formElements[nameIndex + 3]?.focus(); // Focus the next input

        } else if (selectedServiceType === "residential") {

            formElements[index + 2]?.focus(); // Focus the next input
        } else if (selectedServiceType === "commercial") {

            formElements[index + 2]?.focus(); // Focus the next input
        }
        else if (selectedServiceType === "checkbox") {

            formElements[nameIndex + 1]?.focus();
        }
        else {
            formElements[index + 1]?.focus();


        }
    }
};



export const resultHandleEnterKeyPress = (event, selectedServiceType, nameIndex) => {
    if (nameIndex === 20) {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[nameIndex + 1]?.focus();
    }
    if (nameIndex === 19 && selectedServiceType === "timetrip") {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[20]?.focus();
    }
    if (nameIndex === 28 && selectedServiceType === "conspicuous") {
        const formElements = Array?.from(event?.target?.form?.elements);

        formElements[28]?.focus();
    }
    if (nameIndex === 27 && selectedServiceType === "personal") {
        const formElements = Array?.from(event?.target?.form?.elements);

        formElements[28]?.focus();
    }
    if (nameIndex === 20 && selectedServiceType === "suggested") {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[17]?.focus();
    }
    if ((event.key === 'Enter' || event.key === 'Tab') && nameIndex === 21) {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[nameIndex + 1]?.focus();
    }
    if ((event.key === 'Enter' || event.key === 'Tab') && nameIndex === 24) {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[nameIndex + 1]?.focus();
    }
    // if (event.key === 'Enter' || event.key === 'Tab') {
    //     event.preventDefault(); // Prevent the form from submitting
    //     const formElements = Array.from(event.target.form.elements);
    //     const index = formElements.indexOf(event.target);

    //     if (index === nameIndex + 2 && selectedServiceType === "residential") {
    //         formElements[nameIndex + 3]?.focus(); // Focus the next input

    //     } else if (selectedServiceType === "residential") {

    //         formElements[index + 2]?.focus(); // Focus the next input
    //     } else if (selectedServiceType === "commercial") {

    //         formElements[index + 2]?.focus(); // Focus the next input
    //     }
    //     else if (selectedServiceType === "checkbox") {

    //         formElements[nameIndex + 1]?.focus();
    //     }
    //     else {
    //         formElements[index + 1]?.focus();


    //     }
    // }
};
