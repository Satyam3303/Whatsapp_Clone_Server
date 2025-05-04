import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    iss: {
      type: String,
      trim: true,
    },
    nbf: {
      type: Number,
    },
    aud: {
      type: String,
      trim: true,
    },
    sub: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    azp: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    given_name: {
      type: String,
      trim: true,
    },
    family_name: {
      type: String,
      trim: true,
    },
    iat: {
      type: Number,
    },
    exp: {
      type: Number,
    },
    jti: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
