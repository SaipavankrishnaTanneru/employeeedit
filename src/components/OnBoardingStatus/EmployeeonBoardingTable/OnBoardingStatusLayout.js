import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./OnBoardingStatusLayout.module.css";
import { useLocation } from "react-router-dom";
import leftarrow from "../../../assets/onboarding_status_table/leftarrow.svg";
import filtericon from "../../../assets/onboarding_status_table/filtericon.svg";
import SearchBox from "../../../widgets/Searchbox/Searchbox";
import { searchicon } from "../../../assets/onboarding_status_table/searchicon";
import OnBoardingStatusTable from "./OnBoardingStatusTable";
import Button from "../../../widgets/Button/Button";
import GenericNavTabs from "../../../widgets/NavTabs/GenericNavTabs";
import StatusFilterPopup from "../../OnBoardingStatus/EmployeeonBoardingTable/StatusFilterPopup/StatusFilterPopup";
import plusIcon from "../../../assets/onboarding_status_table/PlusIconForOnboardNewEmployee.svg";


const OnBoardingStatusLayout = ({ role, onEmployeeSelect }) => {
  // ====== Role-based filter defaults ======
  const { filterOptions } = useMemo(() => {
    const options = [
      "Completed",
      "Incomplete",
      "Pending With CO",
      "Pending With DO",
      "Skill Test Approval",
      "Skill Test Approved",
      "Rejected",
      "Left"
    ];
    return { filterOptions: options };
  }, [role]);
 
  // ====== State ======
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
 
  // Get base path by removing any existing tab segments
  const getBasePath = () => {
    let basePath = location.pathname;
    // Remove any existing tab segments from the end
    const tabSegments = ['/onboarding', '/skillTest', '/agreements'];
    for (const segment of tabSegments) {
      if (basePath.endsWith(segment)) {
        basePath = basePath.slice(0, -segment.length);
        break;
      }
    }
    return basePath;
  };
 
  const basePath = getBasePath();
 
  // Determine activeTab from pathname (check which segment is at the end)
  const getActiveTabFromPath = () => {
    const pathname = location.pathname;
    if (pathname.endsWith('/agreements')) {
      return 'agreements';
    } else if (pathname.endsWith('/skillTest')) {
      return 'skillTest';
    } else if (pathname.endsWith('/onboarding')) {
      return 'onboarding';
    }
    return 'onboarding'; // default
  };
 
  const activeTab = getActiveTabFromPath();
 
  // ====== Handlers ======
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowFilter(false);
  };
 
  const handleClearFilter = () => setSelectedStatus("");
 
  const handleSearchChange = (newValue) => setSearchValue(newValue);
 
  const handleFilterClose = () => setShowFilter(false);
 
  // ====== JSX ======
  return (
    <div className={styles.container}>
      {/* 🔹 Header Section */}
      <div className={styles.header}>
        <figure>
          <img src={leftarrow} alt="Back" className={styles.arrowIcon} />
          <figcaption>Onboarding Status</figcaption>
        </figure>
        <Button
          buttonname="Onboard New Employee"
          lefticon={<img src={plusIcon} alt="Plus" />}
          variant="primary"
          onClick={() => {
            // Add your navigation or action handler here
            console.log("Onboard New Employee clicked");
          }}
        />
      </div>
 
      {/* 🔹 Segmented Tabs */}
      <div className={styles.tabsContainer}>
        <GenericNavTabs
          tabs={[
            { id: 1, label: "Onboarding Status", path: basePath + "/onboarding" },
            { id: 2, label: "Skill Test Approval", path: basePath + "/skillTest" },
            { id: 3, label: "Agreements", path: basePath + "/agreements" }
          ]}
        />
      </div>
 
      {/* 🔹 Search + Filter Row */}
      <div className={styles.filterRow}>
        {/* Left: Filter Badge */}
        <div>
          {selectedStatus && (
            <div
              className={`${styles.filterBadge} ${
                selectedStatus === "Completed"
                  ? styles.completedBadge
                  : selectedStatus === "Incomplete"
                  ? styles.incompleteBadge
                  : selectedStatus === "Pending With CO"
                  ? styles.pendingWithCOBadge
                  : selectedStatus === "Pending With DO"
                  ? styles.pendingWithDOBadge
                  : selectedStatus.includes("Pending")
                  ? styles.pendingBadge
                  : selectedStatus === "Skill Test Approval"
                  ? styles.skillTestApprovalBadge
                  : selectedStatus === "Skill Test Approved"
                  ? styles.skillTestApprovedBadge
                  : selectedStatus === "Rejected"
                  ? styles.rejectedBadge
                  : selectedStatus === "Left"
                  ? styles.leftBadge
                  : styles.allBadge
              }`}
            >
              <span className={styles.closeIcon} onClick={handleClearFilter}>
                ×
              </span>
              {selectedStatus}
            </div>
          )}
        </div>
 
        {/* Right: Search and Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className={styles.searchWrapper}>
            <SearchBox
              searchicon={searchicon}
              placeholder="Search for anything"
              width="320px"
              onValueChange={handleSearchChange}
            />
          </div>
 
          {/* Filter Icon */}
          <figure
            className={styles.filterFigure}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <img src={filtericon} alt="Filter" className={styles.filterIcon} />
            <figcaption>Status</figcaption>
            {selectedStatus && <span className={styles.redDot}></span>}
          </figure>
 
          {/* Status Filter Popup */}
          <StatusFilterPopup
            open={showFilter}
            filterOptions={filterOptions}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            onClose={handleFilterClose}
            onApply={handleStatusChange}
          />
        </div>
      </div>
 
      {/* 🔹 Table Section */}
      <OnBoardingStatusTable
        selectedStatus={selectedStatus}
        role={role}
        onEmployeeSelect={onEmployeeSelect}
      />
    </div>
  );
};
 
export default OnBoardingStatusLayout;