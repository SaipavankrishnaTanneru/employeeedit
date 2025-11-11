import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./OnBoardingStatusLayout.module.css";
import leftarrow from "../../../assets/onboarding_status_table/leftarrow.svg";
import filtericon from "../../../assets/onboarding_status_table/filtericon.svg";
import SearchBox from "../../../widgets/Searchbox/Searchbox";
import { searchicon } from "../../../assets/onboarding_status_table/searchicon";
import OnBoardingStatusTable from "./OnBoardingStatusTable";

const OnBoardingStatusLayout = ({ role, onEmployeeSelect }) => {
  // ====== Role-based filter defaults ======
  const { defaultStatus, filterOptions } = useMemo(() => {
    const isCO = role === "CO";
    const pendingStatus = isCO ? "Pending with DO" : "Pending with CO";
    const options = ["All", "Completed", "Incomplete", pendingStatus];
    return { defaultStatus: pendingStatus, filterOptions: options };
  }, [role]);

  // ====== State ======
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const [activeTab, setActiveTab] = useState("onboarding");
  const filterRef = useRef(null);

  // ====== Hide filter popup on outside click ======
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ====== Handlers ======
  const handleStatusChange = (status) => {
    setSelectedStatus(status === "All" ? "" : status);
    setShowFilter(false);
  };

  const handleClearFilter = () => setSelectedStatus("");

  const handleSearchChange = (newValue) => setSearchValue(newValue);

  // ====== JSX ======
  return (
    <div className={styles.container}>
      {/* 🔹 Header Section */}
      <figure className={styles.header}>
        <img src={leftarrow} alt="Back" className={styles.arrowIcon} />
        <figcaption>Onboarding Status</figcaption>
      </figure>

      {/* 🔹 Segmented Tabs */}
      <div className={styles.segmentedControl}>
        <button
          className={`${styles.segment} ${
            activeTab === "onboarding" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("onboarding")}
        >
          Onboarding Status
        </button>
        <button
          className={`${styles.segment} ${
            activeTab === "skillTest" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("skillTest")}
        >
          Skill Test Approval
        </button>
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
                  : selectedStatus.includes("Pending")
                  ? styles.pendingBadge
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
            ref={filterRef}
          >
            <img src={filtericon} alt="Filter" className={styles.filterIcon} />
            <figcaption>Status</figcaption>
            {selectedStatus && <span className={styles.redDot}></span>}

            {/* Popup */}
            {showFilter && (
              <div className={styles.filterPopup}>
                <h4>Employee Status</h4>
                {filterOptions.map((status) => (
                  <label key={status} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={
                        status === "All"
                          ? selectedStatus === ""
                          : selectedStatus === status
                      }
                      onChange={() => handleStatusChange(status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </figure>
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
