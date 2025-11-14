import React, { useState } from "react";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import styles from "../PreviousEmployeeInfo/PreviousEmployeeInfo.module.css";
import { useNavigate } from "react-router-dom";

const PreviousEmployerDetails = () => {
  const navigate = useNavigate();

  const [employers, setEmployers] = useState([
    {
      companyName: "",
      designation: "",
      from: "",
      to: "",
      leavingReason: "",
      addressLine1: "",
      addressLine2: "",
      natureOfDuties: "",
      grossSalary: "",
      ctc: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...employers];
    updated[index][name] = value;
    setEmployers(updated);
  };

  const handleAddEmployer = () => {
    setEmployers([
      ...employers,
      {
        companyName: "",
        designation: "",
        from: "",
        to: "",
        leavingReason: "",
        addressLine1: "",
        addressLine2: "",
        natureOfDuties: "",
        grossSalary: "",
        ctc: "",
      },
    ]);
  };

  const handleBack = () => navigate("/scopes/employee/family-info");
  const handleNext = () => navigate("/scopes/employee/next-step"); // replace with your actual next route

  // Dropdown options for date fields
  const fromOptions = ["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020", "May 2020"];
  const toOptions = ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024"];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Previous Employer Details</h3>
        <div className={styles.line}></div>
      </div>

      {employers.map((formData, index) => (
        <div key={index} className={styles.formGrid}>
          {/* Row 1 */}
          <div className={styles.row}>
            <Inputbox
              label="Company Name"
              name="companyName"
              placeholder="Company Full Name"
              value={formData.companyName}
              onChange={(e) => handleChange(index, e)}
            />
            <Inputbox
              label="Designation"
              name="designation"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={(e) => handleChange(index, e)}
            />
            <Dropdown
              dropdownname="From"
              name="from"
              results={fromOptions}
              value={formData.from}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Row 2 */}
          <div className={styles.row}>
            <Dropdown
              dropdownname="To"
              name="to"
              results={toOptions}
              value={formData.to}
              onChange={(e) => handleChange(index, e)}
            />
            <Inputbox
              label="Leaving Reason"
              name="leavingReason"
              placeholder="Enter Reason"
              value={formData.leavingReason}
              onChange={(e) => handleChange(index, e)}
            />
            <Inputbox
              label="Company Address Line 1"
              name="addressLine1"
              placeholder="Enter Company Address Line 1"
              value={formData.addressLine1}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Row 3 */}
          <div className={styles.row}>
            <Inputbox
              label="Company Address Line 2"
              name="addressLine2"
              placeholder="Enter Company Address Line 2"
              value={formData.addressLine2}
              onChange={(e) => handleChange(index, e)}
            />
            <Inputbox
              label="Nature of Duties"
              name="natureOfDuties"
              placeholder="Enter Nature of Duties"
              value={formData.natureOfDuties}
              onChange={(e) => handleChange(index, e)}
            />
            <Inputbox
              label="Gross Salary Per Month"
              name="grossSalary"
              placeholder="Enter Monthly Salary"
              value={formData.grossSalary}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Row 4 */}
          <div className={styles.row}>
            <Inputbox
              label="Enter CTC"
              name="ctc"
              placeholder="Enter CTC"
              value={formData.ctc}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        </div>
      ))}

      {/* Add Employer Button */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          type="button"
          onClick={handleAddEmployer}
          className={styles.addEmployerBtn}
        >
          + Add Employer
        </button>
      </div>

   
    </div>
  );
};

export default PreviousEmployerDetails;
