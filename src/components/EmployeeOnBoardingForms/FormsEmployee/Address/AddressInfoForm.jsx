import React from 'react';
import FormCheckbox from '../../../../widgets/Checkbox/FormCheckbox';
import Button from '../../../../widgets/Button/Button';
import AddressSection from '../../../EmployeeOnBoardingForms/FormsEmployee/AddressSection/AddressSection';
import { useAddressFormik } from '../../../../hooks/useAddressFormik';
import { createAddressFields, defaultCities, defaultStates, defaultCountries } from '../../../../utils/fieldConfigs';
import backIcon from '../../../../assets/icons/backIcon.svg';
import nextIcon from '../../../../assets/icons/nextIcon.svg';
import styles from './AddressInfoForm.module.css';

const AddressInfoFormNew = () => {
  const {
    values,
    errors,
    touched,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched,
   
  } = useAddressFormik();
  
  // Create field configurations
  const addressFields = createAddressFields(defaultCities, defaultStates, defaultCountries);

  
  const handleFieldBlur = (section, field) => setFieldTouched(`${section}.${field}`, true);

  return (
    <div className={styles.address_form_container}>
      {/* Checkbox Section */}
      <div className={styles.checkbox_section}>
        <div className={styles.checkbox_wrapper}>
          <FormCheckbox 
            name="permanentAddressSame"
            checked={values.permanentAddressSame}
            onChange={handleCheckboxChange}
          />
          <span className={styles.checkbox_label}>Permanent Address Same as Current Address</span>
        </div>
      </div>

      {/* Current Address Section */}
      <AddressSection
        fields={addressFields}
        section="currentAddress"
        values={values.currentAddress}
        errors={errors.currentAddress || {}}
        touched={touched.currentAddress || {}}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
      />

      {/* Permanent Address Section - Only show when checkbox is checked */}
      {values.permanentAddressSame && (
        <AddressSection
          title="Permanent Address"
          fields={addressFields}
          section="permanentAddress"
          values={values.permanentAddress}
          errors={errors.permanentAddress || {}}
          touched={touched.permanentAddress || {}}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          showDivider={true}
        />
      )}

    
    </div>
  );
};

export default AddressInfoFormNew;
