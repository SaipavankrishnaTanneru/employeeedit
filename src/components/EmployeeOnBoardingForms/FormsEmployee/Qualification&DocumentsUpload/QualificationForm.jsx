import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Use the correct path for QualificationForm CSS
import styles from '../Qualification&DocumentsUpload/css/QualificationForm.module.css';
 
// Import widgets and icons (ensure paths are correct)
import FormikDropdown from '../Qualification&DocumentsUpload/FormikDropdown';
import Inputbox from '../../../../widgets/Inputbox/InputBox';
import { ReactComponent as BorderIcon } from '../../../../assets/Qualification/border.svg';
import { ReactComponent as UploadIcon } from '../../../../assets/Qualification/Upload.svg';
const AddIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
 
// --- Validation Schema & Initial Values ---
const validationSchema = Yup.object().shape({
    qualifications: Yup.array().of(
        Yup.object().shape({
            qualification: Yup.string().required('Qualification is required'),
            degree: Yup.string().required('Degree is required'),
            university: Yup.string().required('University is required'),
            institute: Yup.string().required('Institute is required'),
            year: Yup.number().typeError('Must be a valid year').required('Year is required'),
            certificate: Yup.mixed().required('A certificate file is required'),
        })
    ),
});
const initialQualification = {
    qualification: '', degree: '', specialization: '',
    university: '', institute: '', year: '', certificate: null, // Ensure this is null
};
const qualificationOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc"];
const degreeOptions = ["Computer Science", "Electronics", "Mechanical", "Civil"];
 
const QualificationForm = () => {
    return (
        <div className={styles.formContainer}>
            <Formik
                initialValues={{ qualifications: [initialQualification] }}
                validationSchema={validationSchema}
                onSubmit={(values) => { /* ... */ }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <FieldArray name="qualifications">
                            {({ push, remove }) => (
                                <>
                                    {/* --- Section Title for the very FIRST block --- */}
                                    {values.qualifications.length > 0 && ( // 👈 CORRECTED: Just check if the array is not empty
                                        <h2 className={styles.formSectionTitle}>
                                            Qualification Details <BorderIcon />
                                        </h2>
                                    )}
 
                                    {values.qualifications.map((_, index) => (
                                        // Apply specific class based on index
                                        <div
                                            key={index}
                                            className={index > 0 ? styles.qualificationBlock : styles.firstQualificationBlock}
                                        >
                                            {/* --- Header & Buttons for ADDITIONAL blocks (index > 0) --- */}
                                            {index > 0 && (
                                                <div className={styles.qualificationHeader}>
                                                    <span className={styles.qualificationTag}>Qualification {index + 1}</span>
                                                    {/* Action buttons positioned absolutely via CSS */}
                                                    <div className={styles.actionBtns}>
                                                        <button
                                                            type="button"
                                                            className={styles.clearBtn} // Make sure this CSS class exists and is styled
                                                            onClick={() => {
                                                                // Ensure initialQualification has the correct default values
                                                                const defaults = {
                                                                    qualification: '',
                                                                    degree: '',
                                                                    specialization: '',
                                                                    university: '',
                                                                    institute: '',
                                                                    year: '',
                                                                    certificate: null // Crucial: File/object fields should reset to null
                                                                };
 
                                                                // Iterate through the default keys
                                                                Object.keys(defaults).forEach(key => {
                                                                    const fieldPath = `qualifications.${index}.${key}`;
                                                                    const defaultValue = defaults[key]; // Use the defined default value
 
                                                                    // Debugging: Log what's being set (optional, remove later)
                                                                    console.log(`Clearing field: ${fieldPath} to value:`, defaultValue);
 
                                                                    setFieldValue(fieldPath, defaultValue);
                                                                });
                                                            }}
                                                        >
                                                            Clear
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styles.closeBtn} // Use sibling style name
                                                            onClick={() => remove(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
 
                                            {/* --- The Form Grid (always rendered inside the block) --- */}
                                            <div className={styles.formGrid}>
                                                {/* All Field components */}
                                                <Field name={`qualifications.${index}.qualification`} component={FormikDropdown} dropdownname="Qualification" results={qualificationOptions} />
                                                <Field name={`qualifications.${index}.degree`} component={FormikDropdown} dropdownname="Degree" results={degreeOptions} />
                                                <Field name={`qualifications.${index}.specialization`} component={Inputbox} label="Specialization" placeholder="Enter Specialization" />
                                                <Field name={`qualifications.${index}.university`} component={Inputbox} label="University" placeholder="Enter University" />
                                                <Field name={`qualifications.${index}.institute`} component={Inputbox} label="Institute" placeholder="Enter Institute" />
                                                <Field name={`qualifications.${index}.year`} component={Inputbox} label="Passed out Year" placeholder="Select Year" type="number" />
 
                                                {/* File Upload */}
                                                <div className={styles.formGroup}>
                                                    {/* Show label only if it's the first block visually */}
                                                    {index === 0 && <label>Upload Certificate</label>}
                                                    <input id={`qualifications.${index}.certificate`} name={`qualifications.${index}.certificate`} type="file" hidden onChange={(e) => setFieldValue(`qualifications.${index}.certificate`, e.currentTarget.files[0])} />
                                                    <label htmlFor={`qualifications.${index}.certificate`} className={styles.uploadButton}><UploadIcon /> Upload File</label>
                                                    {values.qualifications[index].certificate && <span className={styles.fileName}>{values.qualifications[index].certificate.name}</span>}
                                                    <ErrorMessage name={`qualifications.${index}.certificate`} component="div" className={styles.error} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Add Qualification Button */}
                                    <div className={styles.addButtonContainer}>
                                        <button type="button" className={styles.addButton} onClick={() => push(initialQualification)}><AddIcon /> Add Qualification</button>
                                    </div>
                                </>
                            )}
                        </FieldArray>
                        {/* Navigation Buttons */}
                        {/* <div className={styles.navigation}> ... </div> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};
 
export default QualificationForm;
 