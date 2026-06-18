// Vercel serverless function entry point.
// Vercel auto-detects files in /api and serves them as functions.
// All /api/* requests are routed here via vercel.json rewrites.
import app from "../artifacts/api-server/src/app";

export default app;
