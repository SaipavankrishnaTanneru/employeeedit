import React, { useState, useEffect, useMemo } from "react";
import styles from "./OnBoardingStatusTable.module.css";
import rightarrow from "../../../assets/onboarding_status_table/rightarrow.svg";
import uparrow from "../../../assets/onboarding_status_table/uparrow.svg";
import downarrow from "../../../assets/onboarding_status_table/downarrow.svg";

const OnBoardingStatusTable = ({ selectedStatus, role, onEmployeeSelect }) => {
  const [pageIndex, setPageIndex] = useState(0);

  // === Dummy Data for Demo ===
  const employeeTemplates = [
    {
      name: "Surya",
      empNo: "HYD6123871",
      tempPayroll: "TEMP1978612",
      joinDate: "28 June 2025",
      confirmedDate: "29 June 2025",
      leftDate: "-",
      city: "Hyderabad",
      campus: "Miyapur Girls Res.",
      gender: "Male",
      remarks: "No Remarks",
      joiningStatus: "New",
      status: "Pending with DO",
    },
    {
      name: "Vijay",
      empNo: "HYD263287",
      tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023",
      confirmedDate: "15 March 2023",
      leftDate: "-",
      city: "Hyderabad",
      campus: "Miyapur Girls Res.",
      gender: "Female",
      remarks: "No Remarks",
      joiningStatus: "New",
      status: "Completed",
    },
  ];

  const data = Array.from({ length: 20 }, (_, i) => ({
    ...employeeTemplates[i % 2],
  }));

  // === Filter logic ===
  let filteredData = data;
  if (selectedStatus && selectedStatus !== "All") {
    filteredData = data.filter((row) => row.status === selectedStatus);
  }

  const pageSize = 10;
  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pagedData = filteredData.slice(start, end);

  const prevDisabled = pageIndex === 0;
  const nextDisabled = pageIndex + 1 >= totalPages;

  // === Columns ===
  const columns = useMemo(() => {
    const baseColumns = [
      "EMPLOYEE NAME",
      "EMPLOYEE NUMBER",
      "TEMP PAYROLL",
      "JOIN DATE",
      "LEFT DATE",
      "CITY",
      "CAMPUS",
      "GENDER",
      "REMARKS",
      "JOINING STATUS",
      "STATUS",
    ];
    if (role === "CO") {
      const joinDateIndex = baseColumns.indexOf("JOIN DATE");
      baseColumns.splice(joinDateIndex + 1, 0, "CONFIRMED DATE");
    }
    return baseColumns;
  }, [role]);

  // === JSX ===
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index}>
                  <div className={styles.sortableHeader}>
                    <span>{header}</span>
                    <div className={styles.sortIcons}>
                      <img src={uparrow} alt="Sort Up" className={styles.arrowUp} />
                      <img src={downarrow} alt="Sort Down" className={styles.arrowDown} />
                    </div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {pagedData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.empNo}</td>
                <td>{row.tempPayroll}</td>
                <td>{row.joinDate}</td>
                {role === "CO" && <td>{row.confirmedDate}</td>}
                <td>{row.leftDate}</td>
                <td>{row.city}</td>
                <td>{row.campus}</td>
                <td>{row.gender}</td>
                <td>{row.remarks}</td>
                <td>{row.joiningStatus}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      row.status === "Completed"
                        ? styles.statusCompleted
                        : row.status === "Incomplete"
                        ? styles.statusIncomplete
                        : row.status.includes("Pending")
                        ? styles.statusPending
                        : ""
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <img
                    src={rightarrow}
                    alt="Arrow"
                    className={styles.arrowIcon}
                    onClick={() => onEmployeeSelect(row)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateX(4px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateX(0px)")
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <span className={styles.paginationText}>
          Showing <strong>{start + 1}</strong> to{" "}
          <strong>{Math.min(end, total)}</strong> of <strong>{total}</strong>{" "}
          Entries
        </span>

        <div className={styles.paginationRight}>
          <span className={styles.paginationInfo}>
            Page {pageIndex + 1} of {totalPages}
          </span>

          <div className={styles.paginationButtons}>
            <button
              type="button"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={prevDisabled}
              className={`${styles.prevBtn} ${
                prevDisabled ? styles.btnDisabled : ""
              }`}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setPageIndex((prev) =>
                  prev + 1 < totalPages ? prev + 1 : prev
                )
              }
              disabled={nextDisabled}
              className={`${styles.nextBtn} ${
                nextDisabled ? styles.btnDisabled : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingStatusTable;
