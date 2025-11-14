import React from "react";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import styles from "./BasicInfoFields.module.css";

// A simple SVG component for the upload icon
const UploadIcon = () => (
<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 19.3752V2.5835M15.5 2.5835L19.375 7.10433M15.5 2.5835L11.625 7.10433" stroke="#3425FF" stroke-width="1.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.3335 28.4165H20.6668C24.3197 28.4165 26.1474 28.4165 27.2815 27.2824C28.4168 26.1458 28.4168 24.3206 28.4168 20.6665V19.3749C28.4168 15.722 28.4168 13.8956 27.2815 12.7602C26.2895 11.7682 24.7679 11.6429 21.9585 11.6274M9.04183 11.6274C6.23245 11.6429 4.71087 11.7682 3.71887 12.7602C2.5835 13.8956 2.5835 15.722 2.5835 19.3749V20.6665C2.5835 24.3206 2.5835 26.1471 3.71887 27.2824C4.10637 27.6699 4.57395 27.9244 5.16683 28.0923" stroke="#3425FF" stroke-width="1.9375" stroke-linecap="round"/>
</svg>
);

// New SVG component for the delete icon
const DeleteIcon = () => (
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 19.75C8.8375 19.75 8.4845 19.6032 8.191 19.3097C7.8975 19.0162 7.7505 18.663 7.75 18.25V8.5C7.5375 8.5 7.3595 8.428 7.216 8.284C7.0725 8.14 7.0005 7.962 7 7.75C6.9995 7.538 7.0715 7.36 7.216 7.216C7.3605 7.072 7.5385 7 7.75 7H10.75C10.75 6.7875 10.822 6.6095 10.966 6.466C11.11 6.3225 11.288 6.2505 11.5 6.25H14.5C14.7125 6.25 14.8908 6.322 15.0348 6.466C15.1788 6.61 15.2505 6.788 15.25 7H18.25C18.4625 7 18.6408 7.072 18.7848 7.216C18.9288 7.36 19.0005 7.538 19 7.75C18.9995 7.962 18.9275 8.14025 18.784 8.28475C18.6405 8.42925 18.4625 8.501 18.25 8.5V18.25C18.25 18.6625 18.1033 19.0157 17.8098 19.3097C17.5163 19.6037 17.163 19.7505 16.75 19.75H9.25ZM11.5 16.75C11.7125 16.75 11.8908 16.678 12.0348 16.534C12.1788 16.39 12.2505 16.212 12.25 16V10.75C12.25 10.5375 12.178 10.3595 12.034 10.216C11.89 10.0725 11.712 10.0005 11.5 10C11.288 9.9995 11.11 10.0715 10.966 10.216C10.822 10.3605 10.75 10.5385 10.75 10.75V16C10.75 16.2125 10.822 16.3907 10.966 16.5347C11.11 16.6788 11.288 16.7505 11.5 16.75ZM14.5 16.75C14.7125 16.75 14.8908 16.678 15.0348 16.534C15.1788 16.39 15.2505 16.212 15.25 16V10.75C15.25 10.5375 15.178 10.3595 15.034 10.216C14.89 10.0725 14.712 10.0005 14.5 10C14.288 9.9995 14.11 10.0715 13.966 10.216C13.822 10.3605 13.75 10.5385 13.75 10.75V16C13.75 16.2125 13.822 16.3907 13.966 16.5347C14.11 16.6788 14.288 16.7505 14.5 16.75Z" fill="#FF0000"/>
</svg>
);

const BasicInfoForm = ({ formik }) => {
  const { values, handleChange, setFieldValue } = formik;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 300 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          setFieldValue("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Image size must be 300kb or less.");
      }
    }
    // Clear the file input value to allow re-uploading the same file if needed
    e.target.value = null; 
  };

  const handleDeleteImage = () => {
    setFieldValue("profileImage", null); // Set profileImage back to null
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        {/* --- Column 1 --- */}
        <div className={styles.column}>
          <Inputbox
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            value={values.firstName}
            onChange={handleChange}
          />

          <div className={styles.genderGroup}>
            <label className={styles.label}>Gender</label>
            <div className={styles.genderButtons}>
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`${styles.genderBtn} ${
                    values.gender === g ? styles.active : ""
                  }`}
                  onClick={() => setFieldValue("gender", g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <Inputbox
            label="Aadhaar No"
            name="aadharNo"
            placeholder="Enter Aadhaar number"
            value={values.aadharNo}
            onChange={handleChange}
          />

          <Inputbox
            label="Select Date of Birth"
            name="dob"
            type="date"
            placeholder="Select Date" // Added placeholder
            value={values.dob}
            onChange={handleChange}
          />

          <Dropdown
            dropdownname="Category"
            name="category"
            results={["General", "OBC", "SC", "ST"]} // Added sample options
            value={values.category}
            onChange={(e) => setFieldValue("category", e.target.value)}
          />

          <Inputbox
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={values.phoneNumber}
            onChange={handleChange}
          />

          <Dropdown
            dropdownname="Marital Status"
            name="martialStatus"
            results={["Single", "Married"]} // Added sample options
            value={values.martialStatus}
            onChange={(e) => setFieldValue("martialStatus", e.target.value)}
          />

          <Dropdown
            dropdownname="Highest Qualification"
            name="highestQualification"
            results={["High School", "Bachelor's", "Master's", "PhD"]} // Added sample options
            value={values.highestQualification}
            onChange={(e) =>
              setFieldValue("highestQualification", e.target.value)
            }
          />
        </div>

        {/* --- Column 2 --- */}
        <div className={styles.column}>
          <Inputbox
            label="Surname"
            name="surname"
            placeholder="Enter surname"
            value={values.surname}
            onChange={handleChange}
          />

          <Inputbox
            label="Aadhaar Enrollment No"
            name="aadharEnrollementNo"
            placeholder="Enter Aadhaar number"
            value={values.aadharEnrollementNo}
            onChange={handleChange}
          />

          <Dropdown
            dropdownname="Blood Group"
            name="bloodGroup"
            results={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            value={values.bloodGroup}
            onChange={(e) => setFieldValue("bloodGroup", e.target.value)}
          />

          <Inputbox
            label="Application Fee"
            name="applicationFee"
            placeholder="Enter application fee amount"
            value={values.applicationFee}
            onChange={handleChange}
          />

          <Inputbox
            label="Aadhaar No" // Label from Figma
            name="aadharFatherNo" // Name from initialValues
            placeholder="Enter Full Name" // Placeholder from Figma
            value={values.aadharFatherNo}
            onChange={handleChange}
          />

          <Inputbox
            label="Previous ESI No"
            name="previousESINo"
            placeholder="Enter ESI No"
            value={values.previousESINo}
            onChange={handleChange}
          />

          <Inputbox
            label="Total Experience"
            name="totalExperience"
            placeholder="Enter Total Years of Experience"
            value={values.totalExperience}
            onChange={handleChange}
          />
        </div>

        {/* --- Column 3 --- */}
        <div className={styles.column}>
          <div className={styles.profileSection}>
    {!values.profileImage ? (
      // Show this uploader if no image
      <>
        <label htmlFor="profileUpload" className={styles.profileUploadCircle}>
          <UploadIcon />
          <span className={styles.uploadText}>Upload image of Employee</span>
        </label>
        <p className={styles.imageNote}>Max image size is 300kb</p>
      </>
              
            ) : (
              // Show this preview if an image IS selected
              <div className={styles.imageWrapper}>
                <img
                  src={values.profileImage}
                  alt="Profile"
                  className={styles.profileImg}
                />
                {/* Edit Button */}
                <label htmlFor="profileUpload" className={styles.editBtn}>
                 <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 2.375H3.95833C3.53841 2.375 3.13568 2.54181 2.83875 2.83875C2.54181 3.13568 2.375 3.53841 2.375 3.95833V15.0417C2.375 15.4616 2.54181 15.8643 2.83875 16.1613C3.13568 16.4582 3.53841 16.625 3.95833 16.625H15.0417C15.4616 16.625 15.8643 16.4582 16.1613 16.1613C16.4582 15.8643 16.625 15.4616 16.625 15.0417V9.5" stroke="white" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5468 2.07782C14.8617 1.76287 15.2889 1.58594 15.7343 1.58594C16.1797 1.58594 16.6068 1.76287 16.9218 2.07782C17.2367 2.39276 17.4137 2.81992 17.4137 3.26532C17.4137 3.71071 17.2367 4.13787 16.9218 4.45282L9.7865 11.5889C9.59851 11.7767 9.36628 11.9142 9.1112 11.9887L6.83674 12.6537C6.76862 12.6736 6.69641 12.6747 6.62767 12.6571C6.55893 12.6395 6.49619 12.6038 6.44601 12.5536C6.39584 12.5034 6.36007 12.4407 6.34246 12.3719C6.32485 12.3032 6.32604 12.231 6.34591 12.1629L7.01091 9.8884C7.08574 9.63352 7.2235 9.40157 7.4115 9.2139L14.5468 2.07782Z" stroke="white" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  Edit
                </label>
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className={styles.deleteImageBtn}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}

            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
            
           
          </div>

          <Inputbox
            label="PAN Number"
            name="panNumber"
            placeholder="Enter aadhar no"
            value={values.panNumber}
            onChange={handleChange}
          />

          <div>
            <Inputbox
              label="SSC No"
              name="sscNo"
              placeholder="Enter SSC No"
              value={values.sscNo}
              onChange={handleChange}
              disabled={values.sscNotAvailable}
            />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="sscNotAvailable"
                name="sscNotAvailable"
                checked={values.sscNotAvailable}
                onChange={handleChange}
              />
              <label htmlFor="sscNotAvailable">Not Available</label>
            </div>
          </div>

          <Inputbox
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email id"
            value={values.email}
            onChange={handleChange}
          />

          <Inputbox
            label="Father Name"
            name="fatherName"
            placeholder="Enter Father Name"
            value={values.fatherName}
            onChange={handleChange}
          />

          <Inputbox
            label="Previous UAN No"
            name="previousUANNo"
            placeholder="Enter UAN No"
            value={values.previousUANNo}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;