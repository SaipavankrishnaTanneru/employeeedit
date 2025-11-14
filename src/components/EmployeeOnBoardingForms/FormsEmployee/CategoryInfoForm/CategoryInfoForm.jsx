import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./CategoryInfo.module.css";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import dividerline from "../../../../assets/Qualification/border.svg";

const CategoryInfo = () => {
  const validationSchema = Yup.object({
    employeeType: Yup.string().required("Employee Type is required"),
    department: Yup.string().required("Department is required"),
    designation: Yup.string().required("Designation is required"),
    subject: Yup.string().required("Subject is required"),
    agreedPeriods: Yup.string()
      .required("Agreed Periods per week is required")
      .matches(/^\d+$/, "Must be a valid number"),

    chequeCount: Yup.string().required("No Of Cheques Submitted is required"),
    chequeNo: Yup.string().required("Cheque No is required"),
    bankName: Yup.string().required("Bank Name is required"),
  });

  const categoryFields = [
    {
      type: "dropdown",
      name: "employeeType",
      label: "Employee Type",
      options: ["Full-Time", "Part-Time", "Contract"],
    },
    {
      type: "dropdown",
      name: "department",
      label: "Department",
      options: ["Science", "Mathematics", "Humanities", "Admin"],
    },
    {
      type: "dropdown",
      name: "designation",
      label: "Designation",
      options: ["Teacher", "Lecturer", "HOD", "Coordinator"],
    },
    {
      type: "dropdown",
      name: "subject",
      label: "Subject",
      options: ["Physics", "Chemistry", "Maths", "English"],
    },
    {
      type: "input",
      name: "agreedPeriods",
      label: "Agreed Periods per week",
      placeholder: "Enter Agreed Periods per week",
    },
  ];

  const employerReqFields = [
    {
      type: "dropdown",
      name: "chequeCount",
      label: "No Of Cheques Submitted",
      options: ["1", "2", "3", "4"],
    },
    {
      type: "input",
      name: "chequeNo",
      label: "Cheque No",
      placeholder: "Enter Cheque No",
    },
    {
      type: "dropdown",
      name: "bankName",
      label: "Bank Name",
      options: ["HDFC Bank", "SBI", "ICICI", "Axis Bank"],
    },
  ];

  return (
    <div className={styles.category_form_container}>
      {/* Category Info Section */}
      <div className={styles.category_header}>
        <span className={styles.category_title}>Category Info</span>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <Formik
        initialValues={{
          employeeType: "",
          department: "",
          designation: "",
          subject: "",
          agreedPeriods: "",
          chequeCount: "",
          chequeNo: "",
          bankName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted:", values);
          alert("Category & Employer Info Saved!");
        }}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            {/* Category Info Grid */}
            <div className={styles.category_form_grid}>
              {categoryFields.map((field) => (
                <div key={field.name} className={styles.category_form_item}>
                  {field.type === "dropdown" ? (
                    <Dropdown
                      dropdownname={field.label}
                      name={field.name}
                      results={field.options}
                      value={values[field.name]}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                      onBlur={() => setFieldTouched(field.name, true)}
                    />
                  ) : (
                    <Inputbox
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                      onBlur={() => setFieldTouched(field.name, true)}
                    />
                  )}
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className={styles.error}
                  />
                </div>
              ))}
            </div>

            {/* Employer Req Info Section */}
            <div className={styles.category_header}>
              <span className={styles.category_title}>Employer Req Info</span>
              <img src={dividerline} alt="divider" className={styles.dividerImage} />
            </div>

            <div className={styles.category_form_grid}>
              {employerReqFields.map((field) => (
                <div key={field.name} className={styles.category_form_item}>
                  {field.type === "dropdown" ? (
                    <Dropdown
                      dropdownname={field.label}
                      name={field.name}
                      results={field.options}
                      value={values[field.name]}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                      onBlur={() => setFieldTouched(field.name, true)}
                    />
                  ) : (
                    <Inputbox
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                      onBlur={() => setFieldTouched(field.name, true)}
                    />
                  )}
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className={styles.error}
                  />
                </div>
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryInfo;
