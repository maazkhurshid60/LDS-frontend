export const handleZipChange = (event) => {
    const { value } = event.target;

    // Remove non-digit characters (optional, depending on your requirements)
    const sanitizedValue = value.replace(/\D/g, '');

    // Format the value as 'XXX-XXX'
    let formattedValue = sanitizedValue;
    if (sanitizedValue.length > 3) {
        formattedValue = `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3, 6)}`;
    }

    // Update the input value
    setValue("lTSZip", formattedValue); // Update the form state
    event.preventDefault(); // Prevent default behavior
};