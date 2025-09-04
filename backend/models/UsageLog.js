import mongoose from "mongoose";

const UsageLogSchema = new mongoose.Schema({
  user: String,
  units: Number,
  charge: Number,
  planType: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("UsageLog", UsageLogSchema);
