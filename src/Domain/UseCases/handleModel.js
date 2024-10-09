// Handle Model Selection with Dropdown controller
export const handleDropdownClick = (setDropdownOpen, dropdownOpen) => {
    setDropdownOpen(!dropdownOpen);
};

export const handleModelSelect = (model, setSelectedModel, setDropdownOpen) => {
    setSelectedModel(model);
    setDropdownOpen(false);  // Close the dropdown after selection
};
