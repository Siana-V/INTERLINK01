// Minimal API handler using only Node.js built-ins
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Health check
  if (req.url === "/api/healthz") {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ status: "ok" });
    return;
  }

  // API root
  if (req.url === "/api") {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "API is working", timestamp: new Date().toISOString() });
    return;
  }

  // 404
  res.setHeader("Content-Type", "application/json");
  res.status(404).json({ error: "Not found" });
};
