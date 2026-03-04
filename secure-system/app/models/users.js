import mongoose from "mongoose";

const ROLES = ["USER", "ADMIN"];

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ROLES,
      default: "USER",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

//export the model
//it means if the model 'User' already exists, use it. If not, create a new model.
export default mongoose.models.User ||
  mongoose.model("User", userSchema);
