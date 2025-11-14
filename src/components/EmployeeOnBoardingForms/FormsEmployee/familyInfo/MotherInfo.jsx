import React, { useState } from "react";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import styles from "../familyInfo/MotherInfo.module.css";
const MotherInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    nationality: "",
    late: false,
    occupation: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Define your fields
  const inputFields = [
    { label: "Occupation", name: "occupation", placeholder: "Enter Occupation" },
    { label: "Email", name: "email", placeholder: "Enter email id", type: "email" },
    { label: "Phone Number", name: "phoneNumber", placeholder: "Enter phone number", type: "tel" },
  ];

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Mother Information</h3> {/* Updated label */}
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
              value={formData.name}
              onChange={handleChange}
            />
            <label className={styles.checkboxLabel}>
              Late
              <input
                type="checkbox"
                name="late"
                checked={formData.late}
                onChange={handleChange}
              />
            </label>
          </div>

          {dropdownFields.map((field) => (
            <Dropdown
              key={field.name}
              dropdownname={field.dropdownname}
              name={field.name}
              results={field.results}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Second Row */}
        <div className={styles.row}>
          {inputFields.map((field) => (
            <Inputbox
              key={field.name}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              type={field.type || "text"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotherInfo;
