import React from "react";
import styles from "./EmployeeImage.module.css";
import phoneIcon from "../../assets/EmployeeProfileCrad/phoneIcon.svg";
import dotsIcon from "../../assets/EmployeeProfileCrad/dotsicon.svg"; 
import emp_image from "../../assets/EmployeeProfileCrad/emp_image.jpg";
import gendericon from "../../assets/EmployeeProfileCrad/Gendericon.svg";
const EmployeeImage = () => {
  return (
    <div className={styles.employeeprofileContainer}>

      <figure className={styles.employeeProfile}>
        <img className={styles.emp_img}
          src={emp_image}
        />
      </figure>

      <div className={styles.infoSection}>
        <p className={styles.empId}>Employee ID:<br /><span>HYD 253487918</span></p>
        <h3 className={styles.name}>Suresh Raina</h3>

        <div className={styles.details}>
          <span className={styles.detail}>
            <img src={gendericon} alt="Gender icon" className={styles.icon} /> Male
          </span>
          <span className={styles.detail}>• 32 Yrs</span>
          <span className={styles.detail}>• Single</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.designation}>Software Engineer</button>
            <img src={phoneIcon}  />
            <img src={dotsIcon} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeImage;
