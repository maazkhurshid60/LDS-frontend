import { toast } from "react-toastify";

// utils.js or helpers.js
export const handleEnterKeyPress = (event, selectedServiceType, nameIndex) => {



    if (event === "Tab" && nameIndex) {
        // toast.success(`${nameIndex - 1}`)
        // const formElements = Array?.from(event?.target?.form?.elements);
        // formElements[nameIndex - 1]?.focus();

        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);
    }

    if (nameIndex === 1) {
        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);
        formElements[index + 1]?.focus();
        // toast.success(`${index}`)
        // event.preventDefault()
        // const formElements = Array?.from(event?.target?.form?.elements);

    }
    else if (nameIndex === 2) {

        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[2]?.focus();
    }

    else if (event.key === 'Tab' || event.shiftKey) {


        // nameIndex !== undefined && {
        const formElements = Array?.from(event?.target?.form?.elements);
        formElements[nameIndex - 1]?.focus();
        // }
    } else

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
        }    // Handle Shift + Tab key press
        // Handle Shift + Tab (move to the previous field)
        else if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault(); // Prevent default tab behavior
            toast.success("tab")

            // Move focus to the previous field based on conditions
            if (index === nameIndex + 2 && selectedServiceType === "residential") {
                formElements[nameIndex + 1]?.focus();
            } else if (selectedServiceType === "residential" || selectedServiceType === "commercial") {
                formElements[index - 2]?.focus(); // Move backward by 2 fields
            } else if (selectedServiceType === "checkbox") {
                formElements[nameIndex]?.focus();
            } else {
                formElements[index - 1]?.focus(); // Default: Move backward to previous field
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













// import { toast } from "react-toastify";

// // utils.js or helpers.js
// export const handleEnterKeyPress = (event, selectedServiceType, nameIndex) => {

//     if (nameIndex === 1) {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[nameIndex + 1]?.focus();
//     } else if (event.key === 'Tab' && event.shiftKey) {
//         toast.success(`${ nameIndex }`)

//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[nameIndex - 1]?.focus();
//     }
//     if (event.key === 'Enter' || event.key === 'Tab') {
//         event.preventDefault(); // Prevent the form from submitting
//         const formElements = Array.from(event.target.form.elements);
//         const index = formElements.indexOf(event.target);

//         if (index === nameIndex + 2 && selectedServiceType === "residential") {
//             formElements[nameIndex + 3]?.focus(); // Focus the next input

//         } else if (selectedServiceType === "residential") {

//             formElements[index + 2]?.focus(); // Focus the next input
//         } else if (selectedServiceType === "commercial") {

//             formElements[index + 2]?.focus(); // Focus the next input
//         }
//         else if (selectedServiceType === "checkbox") {

//             formElements[nameIndex + 1]?.focus();
//         }
//         else {
//             formElements[index + 1]?.focus();

//         }
//     }    // Handle Shift + Tab key press
//     // Handle Shift + Tab (move to the previous field)
//     else if (event.key === 'Tab' && event.shiftKey) {
//         event.preventDefault(); // Prevent default tab behavior
//         toast.success("tab")

//         // Move focus to the previous field based on conditions
//         if (index === nameIndex + 2 && selectedServiceType === "residential") {
//             formElements[nameIndex + 1]?.focus();
//         } else if (selectedServiceType === "residential" || selectedServiceType === "commercial") {
//             formElements[index - 2]?.focus(); // Move backward by 2 fields
//         } else if (selectedServiceType === "checkbox") {
//             formElements[nameIndex]?.focus();
//         } else {
//             formElements[index - 1]?.focus(); // Default: Move backward to previous field
//         }
//     }
// };


// export const resultHandleEnterKeyPress = (event, selectedServiceType, nameIndex) => {
//     if (nameIndex === 20) {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[nameIndex + 1]?.focus();
//     }
//     if (nameIndex === 19 && selectedServiceType === "timetrip") {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[20]?.focus();
//     }
//     if (nameIndex === 28 && selectedServiceType === "conspicuous") {
//         const formElements = Array?.from(event?.target?.form?.elements);

//         formElements[28]?.focus();
//     }
//     if (nameIndex === 27 && selectedServiceType === "personal") {
//         const formElements = Array?.from(event?.target?.form?.elements);

//         formElements[28]?.focus();
//     }
//     if (nameIndex === 20 && selectedServiceType === "suggested") {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[17]?.focus();
//     }
//     if ((event.key === 'Enter' || event.key === 'Tab') && nameIndex === 21) {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[nameIndex + 1]?.focus();
//     }
//     if ((event.key === 'Enter' || event.key === 'Tab') && nameIndex === 24) {
//         const formElements = Array?.from(event?.target?.form?.elements);
//         formElements[nameIndex + 1]?.focus();
//     }
//     // if (event.key === 'Enter' || event.key === 'Tab') {
//     //     event.preventDefault(); // Prevent the form from submitting
//     //     const formElements = Array.from(event.target.form.elements);
//     //     const index = formElements.indexOf(event.target);

//     //     if (index === nameIndex + 2 && selectedServiceType === "residential") {
//     //         formElements[nameIndex + 3]?.focus(); // Focus the next input

//     //     } else if (selectedServiceType === "residential") {

//     //         formElements[index + 2]?.focus(); // Focus the next input
//     //     } else if (selectedServiceType === "commercial") {

//     //         formElements[index + 2]?.focus(); // Focus the next input
//     //     }
//     //     else if (selectedServiceType === "checkbox") {

//     //         formElements[nameIndex + 1]?.focus();
//     //     }
//     //     else {
//     //         formElements[index + 1]?.focus();

//     //     }
//     // }
// };


