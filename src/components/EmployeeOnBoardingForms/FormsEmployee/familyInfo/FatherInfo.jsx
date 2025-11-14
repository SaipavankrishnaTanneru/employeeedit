import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import styles from "./FatherInfo.module.css";

const FatherInfo = () => {
  const initialValues = {
    name: "",
    bloodGroup: "",
    nationality: "",
    late: false,
    occupation: "",
    email: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const dropdownFields = [
    {
      dropdownname: "Blood Group",
      name: "bloodGroup",
      results: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    {
      dropdownname: "Nationality",
      name: "nationality",
      results: ["Indian", "American", "Canadian", "Other"],
    },
  ];

  const inputFields = [
    { label: "Occupation", name: "occupation", placeholder: "Enter Occupation" },
    { label: "Email", name: "email", placeholder: "Enter email id", type: "email" },
    { label: "Phone Number", name: "phoneNumber", placeholder: "Enter phone number", type: "tel" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}} // No submit logic since button removed
    >
      {({ values, handleChange }) => (
        <Form className={styles.container}>
          <div className={styles.header}>
            <h3>Father Information</h3>
            <div className={styles.line}></div>
          </div>

          <div className={styles.formGrid}>
            {/* First Row */}
            <div className={styles.row}>
              <div className={styles.nameField}>
                <Inputbox
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={values.name}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" component="div" className={styles.errorText} />

                <label className={styles.checkboxLabel}>
                  Late
                  <Field type="checkbox" name="late" />
                </label>
              </div>

              {dropdownFields.map((field) => (
                <Dropdown
                  key={field.name}
                  dropdownname={field.dropdownname}
                  name={field.name}
                  results={field.results}
                  value={values[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* Second Row */}
            <div className={styles.row}>
              {inputFields.map((field) => (
                <div key={field.name} className={styles.inputGroup}>
                  <Inputbox
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={handleChange}
                    type={field.type || "text"}
                  />
                  <ErrorMessage name={field.name} component="div" className={styles.errorText} />
                </div>
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FatherInfo;
