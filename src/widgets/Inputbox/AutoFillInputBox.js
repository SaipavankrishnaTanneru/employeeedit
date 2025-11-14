import React from 'react';
import styles from './AutoFillInputBox.module.css';

const AutoFillInputBox = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  onBlur,
  disabled = false,
  name,
  id,
  type = 'text'
}) => {
  return (
    <div className={styles.autofill_input_wrapper}>
      <label htmlFor={id} className={styles.autofill_input_label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={styles.autofill_input}
      />
    </div>
  );
};

export default AutoFillInputBox;
