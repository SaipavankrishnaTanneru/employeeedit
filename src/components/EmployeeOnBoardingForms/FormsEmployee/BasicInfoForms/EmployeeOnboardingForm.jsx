import React from "react";
import { Formik, Form } from "formik";
import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";
import styles from "./EmployeeOnboardingForm.module.css";
import { ReactComponent as BorderIcon } from '../../../../assets/Qualification/border.svg';

const EmployeeOnboardingForm = () => {
  const initialValues = {
    // Basic Info
    firstName: "",
    surname: "",
    gender: "Male", // Default to Male as in UI
    aadharNo: "",
    aadharEnrollementNo: "",
    panNumber: "",
    dob: "",
    bloodGroup: "",
    sscNo: "",
    sscNotAvailable: false, // Added for checkbox
    applicationFee: "",
    category: "",
    phoneNumber: "",
    email: "", // Added
    aadharFatherNo: "",
    fatherName: "",
    martialStatus: "", // Typo "martialStatus" exists in original code, kept
    previousESINo: "",
    previousUANNo: "", // Fixed typo from 'prevoisUANNo'
    totalExperience: "",
    highestQualification: "", // Added
    profileImage: null, // Added

    // Work Experience
    campus: "",
    campusCode: "",
    campusType: "",
    location: "",
    building: "",
    manager: "",
    joiningAs: "",
    modeOfHiring: "",
    dateOfJoining: "",
    workMode: "",
    hiredBy: "",
    replacementEmployee: "", // Added
  };

  const handleSubmit = (values) => {
    console.log("✅ Submitted all form data:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form className={styles.formContainer}>
          <h2 className={styles.sectionTitle}></h2>
          <BasicInfoFields formik={formik} />

          <h2 className={styles.formSectionTitle}>Working Information <BorderIcon /> </h2>
          <WorkExperienceFields formik={formik} />

          
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeOnboardingForm;