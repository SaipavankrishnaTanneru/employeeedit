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

// --- 🟦 Employee Onboarding Pages ---
import NewEmployeeOnboardingTable from "./components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusTable";
import NewEmployeeOnboarding from "./containers/EmployeeFormsConatiner/EmployeeFormsContainer";

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
  const { user } = useAuth();

  return (
    <div className="whole_container">
      {user && <Header />}
      {user && (
        <aside>
          <SideBarContainer />
        </aside>
      )}

      <main className="main_body">
        <Routes>
          
          {/* --- 🟢 Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* --- 🔒 Protected Routes --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO", "HR"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/application"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Application />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scopes/students"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Students />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fleet"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Fleet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/warehouse"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Warehouse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sms"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Sms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/question-bank"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <QuestionBank />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assets-management"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <AssetsManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payments-service"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <PaymentsService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cctv"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Cctv />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hrms"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Hrms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/masters"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO"]}>
                <Masters />
              </ProtectedRoute>
            }
          />

          {/* --- 🟦 EMPLOYEE MODULE ROUTES --- */}

          {/* 🔹 DO ROUTE (District Officer Review) */}
          <Route
            path="/scopes/employee/do-review/:taskId/*"
            element={
              <ProtectedRoute allowedRoles={["DO"]}>
                <EmployeeModuleContainer role="DO" />
              </ProtectedRoute>
            }
          />

          {/* 🔹 CO ROUTE (Central Office Review) */}
          <Route
            path="/scopes/employee/co-review/:taskId/*"
            element={
              <ProtectedRoute allowedRoles={["CO"]}>
                <EmployeeModuleContainer role="CO" />
              </ProtectedRoute>
            }
          />

          {/* 🔹 HR ROUTE (HR Employee Review) */}
          <Route
            path="/scopes/employee/hr-review/:taskId/*"
            element={
              <ProtectedRoute allowedRoles={["HR"]}>
                <EmployeeModuleContainer role="HR" />
              </ProtectedRoute>
            }
          />

          {/* 🔹 NEW EMPLOYEE ONBOARDING TABLE PAGE */}
          <Route
            path="/scopes/employee/new_employee_onboarding"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO", "HR"]}>
                <NewEmployeeOnboardingTable />
              </ProtectedRoute>
            }
          />

          {/* 🔹 NEW EMPLOYEE ONBOARDING FORM (DO + CO + HR) */}
          <Route
            path="/scopes/employee/new-employee-onboarding/*"
            element={
              <ProtectedRoute allowedRoles={["DO", "CO", "HR"]}>
                <NewEmployeeOnboarding />
              </ProtectedRoute>
            }
          />

          {/* 🔹 HR SPECIAL ENTRY INTO ONBOARDING */}
          <Route
            path="/scopes/employee/hr/new-employee-onboarding/*"
            element={
              <ProtectedRoute allowedRoles={["HR"]}>
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
