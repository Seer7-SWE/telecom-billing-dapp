
const SubscriptionSchema = new mongoose.Schema({
  user: { type: String, index: true },
  planId: Number,
  startedAt: Date,
  validUntil: Date,
  prepaidBalance: String,
  postpaidAccrued: String,
  active: Boolean
}, { timestamps: true });

