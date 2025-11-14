import React, { useState } from "react";
import FatherInfo from "./FatherInfo";
import MotherInfo from "./MotherInfo";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import styles from "../familyInfo/FamilyInfo.module.css";
import { useNavigate } from "react-router-dom";

const FamilyInfo = () => {
  const navigate = useNavigate();

  // store dynamically added family members
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleAddMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      { name: "", relation: "", bloodGroup: "", nationality: "", email: "", phone: "", occupation: "", isLate: false },
    ]);
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...familyMembers];
    updated[index][name] = type === "checkbox" ? checked : value;
    setFamilyMembers(updated);
  };

  const handleBack = () => navigate("/scopes/employee/address-info");
  const handleNext = () => navigate("/scopes/employee/previous-employee-info");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const nationalities = ["Indian", "American", "Canadian", "Other"];
  const relations = ["Brother", "Sister", "Spouse", "Child", "Other"];

  return (
    <div className={styles.container}>
      {/* Static Sections */}
      <FatherInfo />
      <MotherInfo />

      {/* Dynamic Family Members */}
      {familyMembers.map((member, index) => (
        <div key={index} className={styles.section}>
          <h3>Additional Family Member {index + 1}</h3>
          <div className={styles.line}></div>

          <div className={styles.row}>
            <Inputbox
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={member.name}
              onChange={(e) => handleChange(index, e)}
            />

            <Dropdown
              dropdownname="Relation"
              name="relation"
              results={relations}
              value={member.relation}
              onChange={(e) => handleChange(index, e)}
            />

            <Dropdown
              dropdownname="Blood Group"
              name="bloodGroup"
              results={bloodGroups}
              value={member.bloodGroup}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          <div className={styles.row}>
            <Dropdown
              dropdownname="Nationality"
              name="nationality"
              results={nationalities}
              value={member.nationality}
              onChange={(e) => handleChange(index, e)}
            />

            <Inputbox
              label="Occupation"
              name="occupation"
              placeholder="Enter Occupation"
              value={member.occupation}
              onChange={(e) => handleChange(index, e)}
            />

            <Inputbox
              label="Email"
              name="email"
              placeholder="Enter Email"
              value={member.email}
              onChange={(e) => handleChange(index, e)}
            />

            <Inputbox
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={member.phone}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

         
        </div>
      ))}

      {/* Add Family Member Button */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleAddMember} className={styles.addFamilyBtn}>
          + Add Family Member
        </button>
      </div>

   
    </div>
  );
};

export default FamilyInfo;
