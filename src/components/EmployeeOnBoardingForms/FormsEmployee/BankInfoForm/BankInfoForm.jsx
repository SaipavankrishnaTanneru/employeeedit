import React from "react";
import { Formik, Form } from "formik";
import styles from "./BankInfo.module.css";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import dividerline from "../../../../assets/Qualification/border.svg";
import FormCheckbox from "../../../../widgets/Checkbox/FormCheckbox";
 
const BankInfo = () => {
    const initialValues = {
        paymentType: "Bank Transfer",
        bankName: "",
        bankBranch: "",
        salaryLessThan40k: false,
        personalAccountBankName: "",
        personalAccountHolderName: "",
        ifscCode: "",
        accountNo: "",
        payableAt: "",
        personalAccountNo: "",
        personalAccountIFSCCode: "",
    };
 
    const bankOptions = [
        "Select Bank Name",
        "HDFC Bank",
        "ICICI Bank",
        "SBI Bank",
        "Axis Bank",
    ];
 
    return (
        <div className={styles.bank_info_container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log("Bank Information Submitted:", values);
                    alert("Bank Information Saved");
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className={styles.form_grid}>
                        {/* 1. Bank Information Section */}
                        <div className={styles.section_header}>
                            <h3 className={styles.section_title}>Bank Information</h3>
                            <img
                                src={dividerline}
                                alt="divider"
                                className={styles.dividerImage}
                            />
                        </div>
 
                        <div className={styles.form_group}>
                            <div className={styles.form_item}>
                                <Dropdown
                                    dropdownname="Payment Type"
                                    name="paymentType"
                                    results={["Bank Transfer", "Cheque", "Cash"]}
                                    value={values.paymentType}
                                    onChange={(e) => setFieldValue("paymentType", e.target.value)}
                                />
                            </div>
                            <div className={styles.form_item}>
                                <Dropdown
                                    dropdownname="Bank Name"
                                    name="bankName"
                                    results={bankOptions}
                                    value={values.bankName}
                                    onChange={(e) => setFieldValue("bankName", e.target.value)}
                                />
                            </div>
                            <div className={styles.form_item}>
                                <Inputbox
                                    label="Bank Branch"
                                    id="bankBranch"
                                    name="bankBranch"
                                    placeholder="Enter Bank Branch"
                                    value={values.bankBranch}
                                    onChange={(e) => setFieldValue("bankBranch", e.target.value)}
                                />
                            </div>
                        </div>
 
                        {/* 2. Personal Account Info Section */}
                        <div className={styles.section_header}>
                            <h3 className={styles.section_title}>Personal Account Info</h3>
                            <img
                                src={dividerline}
                                alt="divider"
                                className={styles.dividerImage}
                            />
                        </div>
 
                        <div className={styles.checkbox_item}>
                            <FormCheckbox
                                name="salaryLessThan40k"
                                checked={values.salaryLessThan40k}
                                onChange={(val) => setFieldValue("salaryLessThan40k", val)}
                            />
                            <span className={styles.checkbox_label}>Salary Less Than 40,000</span>
                        </div>
 
 
                        <div className={styles.form_group}>
                            <div className={styles.form_item}>
                                <Inputbox
                                    label="Personal Account Bank Name"
                                    id="personalAccountBankName"
                                    name="personalAccountBankName"
                                    placeholder="Enter Account Bank Name"
                                    value={values.personalAccountBankName}
                                    onChange={(e) =>
                                        setFieldValue("personalAccountBankName", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.form_item}>
                                <Inputbox
                                    label="Personal Account Holder Name"
                                    id="personalAccountHolderName"
                                    name="personalAccountHolderName"
                                    placeholder="Enter Personal Account Holder Name"
                                    value={values.personalAccountHolderName}
                                    onChange={(e) =>
                                        setFieldValue("personalAccountHolderName", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.form_item_empty}></div>
                        </div>
 
                        {/* 3. Salary Account Info Section */}
                        <div className={styles.section_header}>
                            <h3 className={styles.section_title}>Salary Account Info</h3>
                            <img
                                src={dividerline}
                                alt="divider"
                                className={styles.dividerImage}
                            />
                        </div>
 
                        <div className={styles.salary_account_rows}>
                            <div className={styles.form_group}>
                                <div className={styles.form_item}>
                                    <Inputbox
                                        label="IFSC Code"
                                        id="ifscCode"
                                        name="ifscCode"
                                        placeholder="Enter IFSC Code"
                                        value={values.ifscCode}
                                        onChange={(e) =>
                                            setFieldValue("ifscCode", e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.form_item}>
                                    <Inputbox
                                        label="Account No"
                                        id="accountNo"
                                        name="accountNo"
                                        placeholder="Enter Account No"
                                        value={values.accountNo}
                                        onChange={(e) =>
                                            setFieldValue("accountNo", e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.form_item}>
                                    <Inputbox
                                        label="Payable At"
                                        id="payableAt"
                                        name="payableAt"
                                        placeholder="Payable At"
                                        value={values.payableAt}
                                        onChange={(e) =>
                                            setFieldValue("payableAt", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
 
                            <div className={styles.form_group}>
                                <div className={styles.form_item}>
                                    <Inputbox
                                        label="Personal Account No"
                                        id="personalAccountNo"
                                        name="personalAccountNo"
                                        placeholder="Enter Personal Account No"
                                        value={values.personalAccountNo}
                                        onChange={(e) =>
                                            setFieldValue("personalAccountNo", e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.form_item}>
                                    <Inputbox
                                        label="Personal Account IFSC Code"
                                        id="personalAccountIFSCCode"
                                        name="personalAccountIFSCCode"
                                        placeholder="Enter Personal Account IFSC Code"
                                        value={values.personalAccountIFSCCode}
                                        onChange={(e) =>
                                            setFieldValue("personalAccountIFSCCode", e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.form_item_empty}></div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
 
export default BankInfo;
 