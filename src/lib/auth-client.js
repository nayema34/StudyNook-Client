import { createAuthClient } from "better-auth/react";

/**
 * Better Auth Client initialization for StudyNook
 * Connects to backend server defined by NEXT_PUBLIC_API_URL
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export default authClient;
