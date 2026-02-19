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

    // Developers who applied
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // Project status
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    // Selected Developer
    selectedDeveloper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // Team members
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
