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

  // 1️⃣ When user clicks arrow in the table
  const handleEmployeeSelect = (employee) => {
    console.log("➡️ Selected Employee:", employee);
    setSelectedEmployee(employee);
    setCurrentView("onboarding");
  };

  // 2️⃣ After completing onboarding
  const handleFinishOnboarding = (lastStepIndex) => {
    console.log("✅ Onboarding finished. Role:", role);
    setLastOnboardingStep(lastStepIndex);
    if (role === "DO") setCurrentView("salary");
    else setCurrentView("checklist");
  };

  // 3️⃣ Salary form complete
  const handleSalarySubmitComplete = () => {
    console.log("💾 Salary details saved");
    setCurrentView(null);
    setTimeout(() => setCurrentView("checklist"), 0);
  };

  // 4️⃣ Back navigation handlers
  const handleBackToTable = () => setCurrentView("table");
  const handleBackToOnboarding = () => setCurrentView("onboarding");
  const handleBackToSalary = () => setCurrentView("salary");
  const checklistOnBack = role === "DO" ? handleBackToSalary : handleBackToOnboarding;

  // --------------- TABLE VIEW ----------------
  if (currentView === "table") {
    return (
      <div className={Styles.widthpptable}>
      
              <OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} />
            </div>
    );
  }

  // --------------- ONBOARDING VIEW ----------------
  if (currentView === "onboarding") {
    return (
      <div className={Styles.widthpp}>
        <div className={Styles.moduleWrapper}>
          <EmployeeOnboardingHeader />
          <div className={Styles.mainContainer}>
            <EmployeeProfileContainer employee={selectedEmployee} />
            <div className={Styles.navSection}>
              <OnBoardingEmployeeNav
                onFinish={handleFinishOnboarding}
                role={role}
                initialStep={lastOnboardingStep}
                onBack={handleBackToTable}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------- SALARY VIEW (DO only) ----------------
  if (currentView === "salary" && role === "DO") {
    return (
      <div className={Styles.widthpp}>
        <div className={Styles.moduleWrapper}>
          <EmployeeOnboardingHeader />
          <div className={Styles.mainContainer}>
            <EmployeeProfileContainer employee={selectedEmployee} />
            <div className={Styles.navSection}>
              <AddSalaryDetails
                onBack={handleBackToOnboarding}
                onSubmitComplete={handleSalarySubmitComplete}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------- CHECKLIST VIEW ----------------
  if (currentView === "checklist") {
    return (
      <div className={Styles.widthpp}>
        <div className={Styles.moduleWrapper}>
          <EmployeeOnboardingHeader />
          <div className={Styles.mainContainer}>
            <EmployeeProfileContainer employee={selectedEmployee} />
            <div className={Styles.navSection}>
              <EmployeeChecklist onBack={checklistOnBack} role={role} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmployeeModuleContainer;
