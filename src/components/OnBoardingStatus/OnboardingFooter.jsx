// Updated OnboardingFooter to handle single step and submitting state
import React from "react";
import styles from "./OnboardingFooter.module.css";
import Button from "../../widgets/Button/Button";
import leftarrow from "../../assets/EmployeeOnBoarding/leftarrow";
import rightarrow from "../../assets/EmployeeOnBoarding/rightarrow";
import skipicon from "../../assets/EmployeeOnBoarding/skipicon.svg";

// --- SVG ICONS --- //
// const NextIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13V12V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM5 12V13H20V12V11H5V12Z"
//       fill="white"
//     />
//   </svg>
// );

// const SkipIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M7.1 17.0154C6.92 17.0154 6.74 16.9654 6.57 16.8754C6.22 16.6854 6 16.3154 6 15.9154V8.09537C6 7.69537 6.22 7.32538 6.57 7.13538C6.92 6.94538 7.35 6.95537 7.69 7.16537L10.72 9.08537C10.95 9.23537 11.02 9.54537 10.87 9.77537C10.7983 9.88662 10.6853 9.96488 10.556 9.993C10.4267 10.0211 10.2914 9.9968 10.18 9.92537L7.15 8.00538C7.15 8.00538 7.08 7.98538 7.05 8.00538C7.02 8.02538 7 8.05537 7 8.09537V15.9154C7 15.9154 7.02 15.9854 7.05 16.0054C7.08 16.0254 7.12 16.0254 7.15 16.0054L10.18 14.0854C10.2914 14.014 10.4267 13.9896 10.556 14.0178C10.6853 14.0459 10.7983 14.1241 10.87 14.2354C10.9414 14.3468 10.9657 14.482 10.9376 14.6114C10.9095 14.7407 10.8312 14.8536 10.72 14.9254L7.69 16.8454C7.51 16.9554 7.31 17.0154 7.1 17.0154Z"
//       fill="#3425FF"
//     />
//     <path
//       d="M11.0502 16.9855C10.8702 16.9855 10.6902 16.9455 10.5302 16.8555C10.1702 16.6655 9.9502 16.2955 9.9502 15.8855V8.11549C9.9502 7.70549 10.1702 7.33549 10.5302 7.14549C10.8902 6.95549 11.3202 6.97549 11.6602 7.19549L17.5302 11.0855C17.8402 11.2855 18.0202 11.6355 18.0202 12.0055C18.0202 12.3755 17.8402 12.7155 17.5302 12.9255L11.6602 16.8155C11.4802 16.9355 11.2702 16.9955 11.0502 16.9955V16.9855Z"
//       fill="#3425FF"
//     />
//   </svg>
// );

const OnboardingFooter = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onFinish,
  allSteps,
  role, // <-- ADD THIS LINE
  isSubmitting = false, // Optional prop for submitting state
  primaryButtonLabel = null, // Optional custom label for primary button
  skipButtonLabel = null, // Optional custom label for skip button
  hideSkip = false // Optional: hide skip button
}) => {
  const isLastStep = currentStep === totalSteps - 1;
  const nextStepLabel = allSteps[currentStep + 1]?.label;
  // First, figure out the correct "Finish" button text based on role
  const finishButtonLabel = role === 'CO' ? "Proceed to Checklist" : "Add CTC Info";

  // Now, use that variable in your main buttonLabel logic
  const buttonLabel = primaryButtonLabel || (isLastStep ? finishButtonLabel : `Proceed to ${nextStepLabel}`); const skipLabel = skipButtonLabel || "Skip all and Add CTC info";

  const handlePrimaryClick = () => {
    if (isLastStep) {
      if (onFinish && !isSubmitting) {
        onFinish();
      }
    } else {
      onNext();
    }
  };

  const handleSkipClick = () => {
    if (onFinish && !isSubmitting) {
      onFinish(); // This will navigate directly to AddSalaryDetails via parent's onFinish
    }
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.center}>
        <Button
          buttonname="Back"
          lefticon={leftarrow}
          variant="secondary"
          onClick={onBack}
          type="button"
          disabled={totalSteps === 1 ? false : currentStep === 0 || isSubmitting}
          width="110px"
        />
        {/* </div> */}

        {/* <div className={styles.center}> */}
        <Button
          buttonname={buttonLabel}
          righticon={rightarrow}
          variant="primary"
          onClick={handlePrimaryClick}
          disabled={isSubmitting}
          width="250px"
        />
      </div>

      {!hideSkip && (
        <div className={styles.right}>
          <button
            className={styles.skipButton}
            onClick={handleSkipClick}
            disabled={isSubmitting}
          >
            <img src={skipicon} alt="skip" className={styles.skipIcon} />
            <span className={styles.skipText}>{skipLabel}</span>
          </button>
        </div>


      )}
    </footer>
  );
};

export default OnboardingFooter;