const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  //
   conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  },//
  roomId: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
