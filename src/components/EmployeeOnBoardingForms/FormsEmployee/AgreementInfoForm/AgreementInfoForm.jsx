import React, { useState } from "react";
import styles from "./AgreementInfoForm.module.css";
import dividerline from "../../../../assets/EmployeeOnBoarding/dividerline.svg";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Checkbox from "../../../../widgets/Checkbox/Checkbox";


const companyOptions = ["Company A", "Company B", "Company C"];
const typeOptions = ["Type X", "Type Y", "Type Z"];
const bankOptions = ["Bank 1", "Bank 2", "Bank 3"];

const AgreementInfoSection = () => {
  const [formData, setFormData] = useState({
    agreementCompany: "",
    agreementType: "",
    providedCheck: false,
    cheques: [
      { chequeNo: "", chequeBank: "", ifscCode: "" }
    ],
  });

  const handleChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;

    if (name === "providedCheck") {
      setFormData((prev) => ({ ...prev, providedCheck: checked }));
    } else if (index !== null) {
      setFormData((prev) => {
        const updated = [...prev.cheques];
        updated[index][name] = value;
        return { ...prev, cheques: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCheque = () => {
    setFormData((prev) => ({
      ...prev,
      cheques: [...prev.cheques, { chequeNo: "", chequeBank: "", ifscCode: "" }],
    }));
  };

  const handleRemoveCheque = (index) => {
    setFormData((prev) => {
      const updated = [...prev.cheques];
      updated.splice(index, 1);
      return { ...prev, cheques: updated };
    });
  };

  const SectionTitle = ({ title }) => (
    <div className={styles.formSectionTitle}>
      <h4>{title}</h4>
      <img src={dividerline} alt="divider" className={styles.dividerLine} />
    </div>
  );

  return (
    <div className={styles.formContainer}>
      {/* Agreement Info Section */}
      <SectionTitle title="Agreement Info" />
      <div className={styles.formGridTwo}>
        <Dropdown
          dropdownname="Agreement Company"
          name="agreementCompany"
          results={companyOptions}
          value={formData.agreementCompany}
          onChange={handleChange}
          dropdownsearch={false}
        />
        <Dropdown
          dropdownname="Agreement Type"
          name="agreementType"
          results={typeOptions}
          value={formData.agreementType}
          onChange={handleChange}
          dropdownsearch={false}
        />
      </div>

      {/* Cheque Info Section */}
      <SectionTitle title="Cheque Info" />

      <div className={styles.checkboxContainer}>
        <Checkbox
          label="Provided Cheque?"
          name="providedCheck"
          checked={formData.providedCheck}
          onChange={handleChange}
        />
      </div>

      {/* Dynamic Cheques */}
      {formData.cheques.map((cheque, index) => (
        <div key={index} className={styles.formGridThree}>
          <Inputbox
            label={`${index + 1}ᵗʰ Cheque No`}
            name="chequeNo"
            placeholder="Enter Cheque No"
            value={cheque.chequeNo}
            onChange={(e) => handleChange(e, index)}
          />
          <Dropdown
            dropdownname={`${index + 1}ᵗʰ Cheque Select Bank`}
            name="chequeBank"
            results={bankOptions}
            value={cheque.chequeBank}
            onChange={(e) => handleChange(e, index)}
            dropdownsearch={false}
          />
          <Inputbox
            label={`${index + 1}ᵗʰ Cheque Bank IFSC Code`}
            name="ifscCode"
            placeholder="Enter IFSC Code"
            value={cheque.ifscCode}
            onChange={(e) => handleChange(e, index)}
          />
          {formData.cheques.length > 1 && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleRemoveCheque(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Cheque Button */}
      <div className={styles.addButtonContainer}>
        <button type="button" onClick={handleAddCheque} className={styles.addButton}>
          + Add Cheque
        </button>
      </div>
    </div>
  );
};

export default AgreementInfoSection;
