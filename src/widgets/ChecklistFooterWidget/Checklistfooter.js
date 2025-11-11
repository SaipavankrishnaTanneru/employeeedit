import React from "react";
import styles from "./ChecklistFooter.module.css";
import Button from "../Button/Button";
import rightarrow from "../../assets/EmployeeOnBoarding/rightarrow";
import leftarrow from "../../assets/EmployeeOnBoarding/leftarrow";

const FooterWidget = ({
  backLabel,
  forwardLabel,
  rejectLabel,
  rejectIcon,
  onBack,
  onForward,
  onReject,
  showReject = true,
}) => {
  return (
    <div className={styles.footerContainer}>
      {/* Back Button */}
      <Button
        buttonname={backLabel}
        lefticon={leftarrow}
        onClick={onBack}
        type="button"
        variant="secondary"
        width="110px"
      />

      {/* Forward Button (using Button widget) */}
      <Button
        buttonname={forwardLabel}
        onClick={onForward}
        type="button"
        righticon={rightarrow}
        variant="primary"
        width="240px"
      />

      {/* Reject Button (icon on right) */}
      {showReject && (
        <button
          className={`${styles.btn} ${styles.rejectBtn}`}
          onClick={onReject}
        >
          {rejectLabel}
          {rejectIcon && (
            <img
              src={rejectIcon}
              alt="reject"
              className={styles.iconRight}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default FooterWidget;
