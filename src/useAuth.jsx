import { useState } from 'react';

// --- THIS IS A TEMPORARY MOCK AUTH HOOK ---
// The Redux developer will replace this file.

export const useAuth = () => {
  
  // -----------------------------------------------------------------
  // V V V V V V -- EDIT THIS LINE TO TEST -- V V V V V V
  // -----------------------------------------------------------------
  
  // Test as a DO: { roles: ['DO'] }
  // Test as a CO: { roles: ['CO'] }
  // Test as both: { roles: ['DO', 'CO'] }
  // Test as logged out: null
  
  const [mockUser] = useState({ 
    username: 'Vivek Sagar',
    roles: ['Hr','DO','CO'] // <-- Change this to test
  });

  // -----------------------------------------------------------------

  return {
    user: mockUser,
    isLoading: false,
  };
};