import mongoose from "mongoose";
const { Schema } = mongoose;

const tutorProfileSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  bio: { 
    type: String 
  },
  hourlyRate: { 
    type: Number, 
    required: true 
  },
  languages: [{ 
    type: String 
  }],
  ratingAvg: { 
    type: Number, 
    default: 0 
  },
  totalLessons: { 
    type: Number, 
    default: 0 
  },
}, {timestamps: true});

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);
export default TutorProfile;
