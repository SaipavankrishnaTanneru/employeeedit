import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// --- 🔒 Security Files ---
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./useAuth";

// --- 🧩 Layout Components ---
import Header from "./components/HeaderComponents/Header";
import SideBarContainer from "./containers/SideBar-container/SideBarContainer";
import EmployeeModuleContainer from "./containers/EmployeeModuleConatiner/EmployeeModuleConatianer";
import NewEmployeeOnboarding from "../src/components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusTable"; // 👈 Add this

// --- 📦 Placeholder / Sample Pages ---
const Dashboard = () => <div>Dashboard</div>;
const Students = () => <div>Students</div>;
const Application = () => <div>Application</div>;
const Fleet = () => <div>Fleet</div>;
const Warehouse = () => <div>Warehouse</div>;
const Sms = () => <div>SMS</div>;
const QuestionBank = () => <div>Question Bank</div>;
const AssetsManagement = () => <div>Assets Management</div>;
const PaymentsService = () => <div>Payment Services</div>;
const Cctv = () => <div>CCTV</div>;
const Hrms = () => <div>HRMS</div>;
const Masters = () => <div>Masters</div>;

// --- 🧭 Auth Pages ---
const LoginPage = () => <div>Login Page</div>;
const AccessDeniedPage = () => <div>Access Denied</div>;

// --- 🪄 Create QueryClient instance ---
const queryClient = new QueryClient();

function AppWrapper() {
  const { user } = useAuth(); // Determine if user logged in

  return (
    <div className="whole_container">
      {/* Show sidebar and header only when logged in */}
      {user && <Header />}
      {user && (
        <aside>
          <SideBarContainer />
        </aside>
      )}

      <main className="main_content">
        <Routes>
          {/* --- 🟢 Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* --- 🔒 Protected / Main Routes --- */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<Application />} />
          <Route path="/scopes/students" element={<Students />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/sms" element={<Sms />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route path="/assets-management" element={<AssetsManagement />} />
          <Route path="/payments-service" element={<PaymentsService />} />
          <Route path="/cctv" element={<Cctv />} />
          <Route path="/hrms" element={<Hrms />} />
          <Route path="/masters" element={<Masters />} />

          {/* --- 🟦 EMPLOYEE MODULE (Secure DO/CO routes) --- */}

          {/* 🔹 DO ROUTE (District Officer Review) */}
          <Route
            path="scopes/employee/do-review/:taskId/*"
            element={
              <ProtectedRoute allowedRoles={["DO"]}>
                <EmployeeModuleContainer role="DO" />
              </ProtectedRoute>
            }
          />

          {/* 🔹 CO ROUTE (Central Office Review) */}
          <Route
            path="scopes/employee/co-review/:taskId/*"
            element={
              <ProtectedRoute allowedRoles={["CO"]}>
                <EmployeeModuleContainer role="CO" />
              </ProtectedRoute>
            }
          />

          {/* 🔹 NEW EMPLOYEE ONBOARDING PAGE (opened after right-arrow click) */}
          <Route
            path="/new_employee_onboarding"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <NewEmployeeOnboarding />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

// --- Root App Wrapper with React Query ---
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  );
}

export default App;
