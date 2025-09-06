import express from "express";
const router = express.Router();

// ✅ Basic test route
router.get("/", (req, res) => {
  res.json([
    { user: "Alice", units: 120, charge: 6.0 },
    { user: "Bob", units: 300, charge: 9.0 }
  ]);
});

export default router;
