import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
