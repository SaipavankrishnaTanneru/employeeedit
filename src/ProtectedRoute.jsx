import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth'; // Our mock auth hook

/**
 * Checks if a user is authorized for a page.
 * @param {object} props
 * @param {React.ReactNode} props.children - The page to render.
 * @param {string[] | undefined} props.allowedRoles - List of roles that can see this page (e.g., ['DO']).
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => { // FIX 1: Set default to empty array
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  // FIX 2: Check if allowedRoles is empty (general protection)
  // If allowedRoles is empty (e.g., <ProtectedRoute>), any logged-in user is authorized.
  if (allowedRoles.length === 0) {
    return children;
  }

  // FIX 3: Ensure userRoles is an array before checking
  // This prevents the TypeError if `user.roles` is missing or undefined/null.
  const userRoles = user.roles || [];

  // Check if user has at least one of the allowed roles
  // Note: We use `allowedRoles` directly, which is guaranteed to be an array now.
  const isAuthorized = userRoles.some(userRole => allowedRoles.includes(userRole));

  if (!isAuthorized) {
    // User is logged in, but not authorized
    return <Navigate to="/access-denied" replace />;
  }

  // User is logged in and authorized
  return children;
};

export default ProtectedRoute;