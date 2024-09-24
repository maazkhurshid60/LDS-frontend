// utils.js or helpers.js
export const handleEnterKeyPress = (event, selectedServiceType, nameIndex) => {

    // console.log(event.target.form.elements)
    if (nameIndex === 1) {
        // console.log("captopin field focued")
        const formElements = Array?.from(event?.target?.form?.elements);

        formElements[nameIndex + 2]?.focus();
    }
    if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault(); // Prevent the form from submitting
        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);
        // console.log(index, nameIndex + 2)

        if (index === nameIndex + 2 && selectedServiceType === "residential") {
            console.log("dsaf", index + 1)
            formElements[nameIndex + 3]?.focus(); // Focus the next input
        } else if (selectedServiceType === "residential") {
            // console.log("secnd", index + 1)

            formElements[index + 2]?.focus(); // Focus the next input
        } else if (selectedServiceType === "commercial") {
            // console.log("thrd", index + 1)

            formElements[index + 2]?.focus(); // Focus the next input
        }
        else if (selectedServiceType === "checkbox") {
            formElements[nameIndex + 1]?.focus();
        }
        else {
            // console.log("last", index + 1)
            formElements[index + 1]?.focus();

        }
    }
};
