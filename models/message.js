const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  string: {
    type: String,
  },
  files: [
    {
      type: String,
    },
  ],
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },

  // Keep track of all message number between the same users
  sortNumber: {
    type: Number,
    required: true,
  },
});

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Message", messageSchema);
