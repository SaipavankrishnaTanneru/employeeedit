import React from 'react';
import InputBox from '../../../../widgets/Inputbox/InputBox';
import Dropdown from '../../../../widgets/Dropdown/Dropdown';
import AutoFillInputBox from '../../../../widgets/Inputbox/AutoFillInputBox';
import phoneIcon from '../../../../assets/JoinerPortalIcons/phoneIcon.svg';
import styles from './FormField.module.css';

const FormField = ({ 
  field, 
  section, 
  value, 
  onChange, 
  onBlur,
  error,
  touched,
  disabled = false 
}) => {
  const fieldId = `${section}${field.key.charAt(0).toUpperCase() + field.key.slice(1)}`;
  
  const handleChange = (e) => {
    onChange(section, field.key, e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(section, field.key);
    }
  };

  const renderInputField = () => (
    <div className={styles.field_wrapper}>
      <InputBox
        label={field.label}
        id={fieldId}
        name={fieldId}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {touched && error && (
        <div className={styles.error_message}>{error}</div>
      )}
    </div>
  );

  const renderDropdownField = () => (
    <div className={styles.field_wrapper}>
      <Dropdown
        dropdownname={field.label}
        name={fieldId}
        results={field.options}
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
      />
      {touched && error && (
        <div className={styles.error_message}>{error}</div>
      )}
    </div>
  );

  const renderPhoneField = () => (
    <div className={styles.field_wrapper}>
      <div className={styles.phone_input_wrapper}>
        <label htmlFor={fieldId}>{field.label}</label>
        <div className={styles.phone_input_container}>
          <input
            type="text"
            id={fieldId}
            name={fieldId}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.phone_input} ${touched && error ? styles.error_input : ''}`}
            disabled={disabled}
          />
          <div className={styles.phone_icon}>
            <img src={phoneIcon} alt="Phone" width="16" height="16" />
          </div>
        </div>
      </div>
      {touched && error && (
        <div className={styles.error_message}>{error}</div>
      )}
    </div>
  );

  const renderAutoFillField = () => (
    <div className={styles.field_wrapper}>
      <AutoFillInputBox
        label={field.label}
        id={fieldId}
        name={fieldId}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || field.disabled}
      />
      {touched && error && (
        <div className={styles.error_message}>{error}</div>
      )}
    </div>
  );

  const renderField = () => {
    switch (field.type) {
      case 'input':
        return renderInputField();
      case 'dropdown':
        return renderDropdownField();
      case 'phone':
        return renderPhoneField();
      case 'autofill':
        return renderAutoFillField();
      default:
        return null;
    }
  };

  return renderField();
};

export default FormField;
