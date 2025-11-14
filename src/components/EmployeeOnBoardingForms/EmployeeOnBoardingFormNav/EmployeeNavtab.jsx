// src/components/EmployeeComponents/EmployeeNavtab.js

import React from "react";
import NavTabsWithIcons from "../../../widgets/NavTabs/NavTabWithIcons";
import { onboardingSteps } from "../../../config/onboardingTabs";

const EmployeeNavTabOnBoarding = ({ basePath }) => {
  return <NavTabsWithIcons tabs={onboardingSteps} basePath={basePath} />;
};

export default EmployeeNavTabOnBoarding;
