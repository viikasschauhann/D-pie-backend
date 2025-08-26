import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["STUDENT", "TUTOR", "ADMIN"], 
    required: true 
  },
  profileImg: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;

