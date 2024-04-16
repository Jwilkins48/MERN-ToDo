import mongoose from "mongoose";

// Schema
const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
