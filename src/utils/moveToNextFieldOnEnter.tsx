// utils.js or helpers.js
export const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the form from submitting
        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);
        formElements[index + 1]?.focus(); // Focus the next input
    }
};
