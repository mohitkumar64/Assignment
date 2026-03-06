const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student ID is required"],
    },

    TeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Teacher ID is required"],
    },

    date: {
      type: Date,
      required: [true, "Appointment date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Appointment date cannot be in the past",
      },
    },

    TimeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
       required: [true, " subject  is required"],
    },

    reason: {
      type: String,
      trim: true,
    },

    Mode: {
      type: String,
      enum: {
        values: ["In Person", "Online"],
        message: "Mode must be either 'In Person' or 'Online'",
      },
      default: "Online",
    },

    Status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Invalid status value",
      },
      default: "pending",
    },

    expireAt: {
      type: Date,
      index: { expireAfterSeconds: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
