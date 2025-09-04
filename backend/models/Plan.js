import mongoose from "mongoose";
const PlanSchema = new mongoose.Schema({
  planId: { type: Number, index: true, unique: true },
  name: String,
  planType: { type: String, enum: ["PREPAID", "POSTPAID"] },
  pricePerUnit: String,
  subscriptionFee: String,
  validityDays: Number,
  active: Boolean
}, { timestamps: true });

export default mongoose.model("Plan", PlanSchema);
