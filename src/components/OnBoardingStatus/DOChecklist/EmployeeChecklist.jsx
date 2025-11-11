// src/component/EmployeeChecklist/EmployeeChecklist.js
import React, { useState } from "react";
import styles from "./EmployeeChecklist.module.css";
import FooterWidget from "../../../widgets/ChecklistFooterWidget/Checklistfooter";
import RejectModalWidget from "../../../widgets/RejectModalWidget/RejectModalWidget";
import DocumentSection from "./DocumentSection";
import PrejoiningSection from "./PrejoiningSection";

// icons
import leftarrow from "../../../assets/EmployeeOnBoarding/leftarrow.svg";
import rightarrow from "../../../assets/EmployeeOnBoarding/rightarrow.svg";
import rejecticon from "../../../assets/EmployeeOnBoarding/rejecticon.svg";

// FIX: Accept the 'onBack' prop here
const EmployeeChecklist = ({ role, onBack }) => { 
  const [showRejectModal, setShowRejectModal] = useState(false);

  // "Lift State Up"
  const [noticePeriod, setNoticePeriod] = useState("");

  // Make footer labels dynamic based on role
  const isCO = role?.toUpperCase() === "CO";
  const forwardLabel = isCO ? "Confirm" : "Forward to Central Office";

  const handleForwardClick = () => {
    if (isCO) {
      console.log("CO Confirmed. Notice Period:", noticePeriod);
      // Add your API call for CO confirmation here
    } else {
      console.log("DO Forwarded to Central Office");
      // Add your API call for DO forwarding here
    }
  };
  const rejectTitle = isCO ? "Back To DO?" : "Back To Campus";
  const rejectSubtitle = isCO ? "Enter the reason why to send back to DO" : "Enter the reason why to send back to campus";
  const rejectPlaceholder = isCO ? "Enter the reason to send back to DO" : "Enter the reason to send back to campus";
  const rejectSubmitLabel = isCO ? "Back to DO" : "Back to Campus";
  return (
    <div className={styles.container}>
      <div>
        <DocumentSection />

        {/* Pass all props down to PrejoiningSection */}
        <PrejoiningSection
          role={role}
          noticePeriod={noticePeriod}
          setNoticePeriod={setNoticePeriod}
        />

        <FooterWidget
          backLabel="Back"
          // Use the dynamic label
          forwardLabel={forwardLabel}
          rejectLabel="Reject"
          backIcon={leftarrow}
          forwardIcon={rightarrow}
          rejectIcon={rejecticon}
          onBack={onBack} // FIX: Use the dynamic onBack prop
          // Use the new dynamic click handler
          onForward={handleForwardClick}
          onReject={() => setShowRejectModal(true)}
        />

        <RejectModalWidget
          open={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title={rejectTitle}
          subtitle={rejectSubtitle}
          label="Enter Remarks"
          placeholder={rejectPlaceholder}
          cancelLabel="Cancel"
          submitLabel={rejectSubmitLabel}
          onSubmit={(reason) => console.log("Reason:", reason)}
        />
      </div>
    </div>
  );
};

export default EmployeeChecklist;