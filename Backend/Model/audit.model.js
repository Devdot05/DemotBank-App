const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  description: String,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now },
  success: Boolean,
  metadata: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
