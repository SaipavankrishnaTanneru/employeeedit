import { useFormik } from 'formik';
import { validateField, addressValidationSchema } from '../utils/validationUtils';

const initialAddress = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  pin: '',
  city: '',
  state: '',
  country: '',
  phone: '',
 
};

export const useAddressFormik = () => {
  const formik = useFormik({
    initialValues: {
      permanentAddressSame: false,
      currentAddress: { ...initialAddress },
      permanentAddress: { ...initialAddress }
    },
    validate: (values) => {
      const errors = {};
      
      // Validate current address
      const currentErrors = validateAddress(values.currentAddress);
      if (Object.keys(currentErrors).length > 0) {
        errors.currentAddress = currentErrors;
      }
      
      // Validate permanent address only if not same as current
      if (!values.permanentAddressSame) {
        const permanentErrors = validateAddress(values.permanentAddress);
        if (Object.keys(permanentErrors).length > 0) {
          errors.permanentAddress = permanentErrors;
        }
      }
      
      return errors;
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    }
  });

  // Simple validation function
  const validateAddress = (address) => {
    const errors = {};
    Object.keys(addressValidationSchema).forEach(field => {
      const error = validateField(address[field], addressValidationSchema[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked) => {
    formik.setFieldValue('permanentAddressSame', checked);
    if (checked) {
      // Copy current address to permanent address only when checkbox is checked
      formik.setFieldValue('permanentAddress', { ...formik.values.currentAddress });
    } else {
      // Clear permanent address when checkbox is unchecked
      formik.setFieldValue('permanentAddress', { ...initialAddress });
    }
  };

  // Handle field changes
  const handleFieldChange = (section, field, value) => {
    formik.setFieldValue(`${section}.${field}`, value);
    
    // No automatic copying - addresses are completely separate
  };

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    isValid: formik.isValid,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched: formik.setFieldTouched,
    formik
  };
};
