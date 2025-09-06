import express from "express";
const router = express.Router();

// Mock response for testing
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Prepaid Basic", pricePerUnit: 0.05 },
    { id: 2, name: "Postpaid Standard", pricePerUnit: 0.03 }
  ]);
});

export default router;
