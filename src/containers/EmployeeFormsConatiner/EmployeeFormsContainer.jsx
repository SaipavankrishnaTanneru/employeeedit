import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch,
  useLocation
} from "react-router-dom";

import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";

import { onboardingSteps } from "../../config/onboardingTabs";
import { useAuth } from "../../useAuth";

// Forms
import QualificationForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/QualificationForm";
import UploadDocumentsForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/UploadDocumentsForm";
import BasicInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BasicInfoForms/EmployeeOnboardingForm";
import AddressInfoFormNew from "../../components/EmployeeOnBoardingForms/FormsEmployee/Address/AddressInfoForm";
import FamilyInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/familyInfo/FamilyInfo";
import PreviousEmployerInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/PreviousEmployeeInfo/PreviousEmployeeInfo";
import AgreementInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm";
import CategoryInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm";
import BankInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm";

import OnboardingFooter from "../../components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter";

import styles from "./EmployeeFormsContainer.module.css";

const NewEmployeeOnboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // User Role
  const { user } = useAuth();
  const role = user?.roles?.[0];
  const isHR = role === "HR";

  // Detect BASE URL (HR or DO/CO)
  const basePath = location.pathname.includes("/hr/")
    ? "/scopes/employee/hr/new-employee-onboarding"
    : "/scopes/employee/new-employee-onboarding";

  // Match the correct dynamic route
  const match = useMatch(`${basePath}/:tab`);
  const currentTab = match?.params?.tab;

  // Determine current step index
  let currentStep = 0;
  if (currentTab) {
    const idx = onboardingSteps.findIndex((s) => s.path === currentTab);
    currentStep = idx !== -1 ? idx : 0;
  }

  const totalSteps = onboardingSteps.length;

  // 🟢 Navigation (Next / Back)
  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      navigate(`${basePath}/${onboardingSteps[currentStep + 1].path}`);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      navigate(`${basePath}/${onboardingSteps[currentStep - 1].path}`);
    } else {
      navigate(-1);
    }
  };

  const finish = () => {
    alert("Finish Onboarding! Add your final API here.");
  };

  return (
    <div className={`${styles.mainContainer} ${isHR ? styles.hrContainer : ""}`}>

      {/* Header */}
      <div className={styles.headerWrapper}>
        <EmployeeOnboardingHeader
          step={currentStep + 1}
          totalSteps={totalSteps}
          onBack={goBack}
          mainTitle={isHR ? "HR Employee Onboarding Management" : "New Employee Onboarding"}
          subHeading=""
        />
      </div>

      {/* Tabs */}
      <div className={styles.navTabsWrapper}>
        <EmployeeNavTabOnBoarding basePath={basePath} />
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        <Routes>
          {/* Default redirect */}
          <Route
            index
            element={<Navigate to={onboardingSteps[0].path} replace />}
          />

          {/* Child routes (relative) */}
          <Route path="basic-info" element={<BasicInfo />} />
          <Route path="address-info" element={<AddressInfoFormNew />} />
          <Route path="family-info" element={<FamilyInfo />} />
          <Route path="previous-employer-info" element={<PreviousEmployerInfo />} />
          <Route path="qualification" element={<QualificationForm />} />
          <Route path="upload-documents" element={<UploadDocumentsForm />} />
          <Route path="category-info" element={<CategoryInfo />} />
          <Route path="bank-info" element={<BankInfo />} />
          <Route path="agreements" element={<AgreementInfoForm />} />
        </Routes>
      </div>

      {/* Footer */}
      <OnboardingFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        allSteps={onboardingSteps}
        role={role}
        onNext={goNext}
        onBack={goBack}
        onFinish={finish}
        hideSkip={true}
      />
    </div>
  );
};

export default NewEmployeeOnboarding;
