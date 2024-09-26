// utils.js or helpers.js
export const handleEnterKeyPress = (event, selectedServiceType, nameIndex) => {

    if (nameIndex === 1) {
        const formElements = Array?.from(event?.target?.form?.elements);

        formElements[nameIndex + 2]?.focus();
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
