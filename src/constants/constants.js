// src/constants/constants.js

export const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

// App Script or Webhook Exec endpoint (if applicable)
export const GOOGLEAPI = `${CLIENT_ID || ""}${CLIENT_SECRET || ""}/exec`;