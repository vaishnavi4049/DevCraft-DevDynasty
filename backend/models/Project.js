const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    openRole: {
      type: String,
      required: true
    },

    requiredSkills: [
      {
        type: String
      }
    ],

    duration: {
      type: String
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔥 NEW: Developers who applied
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // 🔥 NEW: Project status
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    // 🔥 OPTIONAL: Selected Developer (future feature)
    selectedDeveloper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
