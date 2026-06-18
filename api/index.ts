// Vercel serverless function entry point.
// Import the Express app directly (don't use the built version that calls listen())
import app from "../artifacts/api-server/src/app";

export default app;
