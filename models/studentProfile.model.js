import mongoose from "mongoose";
const { Schema } = mongoose;

const studentProfileSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  goals: { 
    type: String 
  },
  preferredSubjects: [{ 
    type: String 
  }],
}, {timestamps: true});

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);
export default StudentProfile;