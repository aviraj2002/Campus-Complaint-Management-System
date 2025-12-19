// In a real application, these values would come from your environment variables
// and your service account JSON file.
// For demonstration purposes, they are placeholders.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-public-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id",
};

// This is a placeholder for your Firebase Admin service account key
// In a real project, you'd load this from a secure location, NEVER commit it to git.
export const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "your-client-email",
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || 'your-private-key').replace(/\\n/g, '\n'),
};
