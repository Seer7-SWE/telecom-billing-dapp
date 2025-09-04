import express from "express";
import UsageLog from "../models/UsageLog.js";

const router = express.Router();

// GET mock usage logs
router.get("/", async (req, res) => {
  try {
    const logs = await UsageLog.find().limit(10).sort({ date: -1 });
    if (logs.length === 0) {
      // return mock if empty
      return res.json([
        { date: "2025-09-01", units: 120, charge: 1.2, planType: "PREPAID" },
        { date: "2025-09-02", units: 80, charge: 0.8, planType: "PREPAID" },
      ]);
    }
    res.json(
      logs.map((l) => ({
        date: l.date.toISOString().split("T")[0],
        units: l.units,
        charge: l.charge,
        planType: l.planType,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST mock usage log
router.post("/", async (req, res) => {
  try {
    const log = new UsageLog(req.body);
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
