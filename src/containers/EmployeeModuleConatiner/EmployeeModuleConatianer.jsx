import React, { useState } from "react";
import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import OnBoardingEmployeeNav from "../../components/OnBoardingStatus/OnBoardingEmployeeNav";
import AddSalaryDetails from "../../components/OnBoardingStatus/EmployeeNavOverview/AddSalaryDetails";
import EmployeeChecklist from "../../components/OnBoardingStatus/DOChecklist/EmployeeChecklist";
import EmployeeProfileContainer from "../EmployeeProfileContainer/EmployeeProfileConytainer";
import OnBoardingStatusLayout from "../../components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusLayout";
import Styles from "./EmployeeModuleConatiner.module.css";

const EmployeeModuleContainer = ({ role }) => {
  const [currentView, setCurrentView] = useState("table");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [lastOnboardingStep, setLastOnboardingStep] = useState(0);

  // --- Step Flow Logic ---
  const isDO = role === "DO";
  const totalSteps = isDO ? 3 : 2;

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("onboarding");
  };

  const handleFinishOnboarding = (lastStepIndex) => {
    setLastOnboardingStep(lastStepIndex);

    if (isDO) setCurrentView("salary");
    else setCurrentView("checklist");
  };

  const handleSalarySubmitComplete = () => {
    setCurrentView("checklist");
  };

  const handleBackToTable = () => setCurrentView("table");
  const handleBackToOnboarding = () => setCurrentView("onboarding");
  const handleBackToSalary = () => setCurrentView("salary");

  const checklistOnBack = isDO ? handleBackToSalary : handleBackToOnboarding;

  // --- Subheading based on current view ---
  const getSubHeading = () => {
    switch (currentView) {
      case "onboarding":
        return "Employee Preview";
      case "salary":
        return "Add Salary Details";
      case "checklist":
        return "CheckList";
      default:
        return "Employee Preview";
    }
  };

  // --- Step Index for Header ---
  const getCurrentStep = () => {
    switch (currentView) {
      case "onboarding":
        return 1;
      case "salary":
        return 2;
      case "checklist":
        return isDO ? 3 : 2;
      default:
        return 0;
    }
  };

  // --- Render Views ---
  if (currentView === "table") {
    return (
      <div className={Styles.widthpptable}>
        <OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} />
      </div>
    );
  }

  return (
    <div className={Styles.widthpp}>
      <div className={Styles.moduleWrapper}>
        <EmployeeOnboardingHeader
          step={getCurrentStep()}
          totalSteps={totalSteps}
          subHeading={getSubHeading()}
          onBack={
            currentView === "onboarding"
              ? handleBackToTable
              : currentView === "salary"
              ? handleBackToOnboarding
              : checklistOnBack
          }
        />

        <div className={Styles.mainContainer}>
          <EmployeeProfileContainer employee={selectedEmployee} />

          <div className={Styles.navSection}>
            {currentView === "onboarding" && (
              <OnBoardingEmployeeNav
                onFinish={handleFinishOnboarding}
                role={role}
                initialStep={lastOnboardingStep}
                onBack={handleBackToTable}
              />
            )}

            {currentView === "salary" && isDO && (
              <AddSalaryDetails
                onBack={handleBackToOnboarding}
                onSubmitComplete={handleSalarySubmitComplete}
              />
            )}

            {currentView === "checklist" && (
              <EmployeeChecklist onBack={checklistOnBack} role={role} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModuleContainer;
