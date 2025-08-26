import mongoose from "mongoose";
const { Schema } = mongoose;

const tutorSubjectSchema = new Schema({
  tutor: { 
    type: Schema.Types.ObjectId, 
    ref: "TutorProfile", 
    required: true 
  },
  subject: { 
    type: Schema.Types.ObjectId, 
    ref: "Subject", 
    required: true 
  },
}, {timestamps: true});

const TutorSubject = mongoose.model("TutorSubject", tutorSubjectSchema);
export default TutorSubject;
