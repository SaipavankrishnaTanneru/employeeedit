// Field configuration utility for address forms
export const createAddressFields = (cities, states, countries) => [
  { key: 'name', label: 'Name', type: 'input', placeholder: 'Enter Name' },
  { key: 'addressLine1', label: 'Address Line 1', type: 'input', placeholder: 'Enter Address Line 1' },
  { key: 'addressLine2', label: 'Address Line 2', type: 'input', placeholder: 'Enter Address Line 2' },
  { key: 'addressLine3', label: 'Address Line 3', type: 'input', placeholder: 'Enter Address Line 3' },
  { key: 'pin', label: 'Pin', type: 'input', placeholder: 'Enter Pin' },
  { key: 'city', label: 'City', type: 'dropdown', options: cities, disabled: false },
  { key: 'state', label: 'State', type: 'autofill', placeholder: 'Select State', disabled: true },
  { key: 'country', label: 'Country', type: 'autofill', placeholder: 'Select Country', disabled: true },
  { key: 'phone', label: 'Phone Number', type: 'phone', placeholder: 'Enter phone number' },
  
];

// Default data options
export const defaultCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
export const defaultStates = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'];
export const defaultCountries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'];

// Form field types
export const FIELD_TYPES = {
  INPUT: 'input',
  DROPDOWN: 'dropdown',
  PHONE: 'phone'
};
