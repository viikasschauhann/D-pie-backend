import mongoose from "mongoose";
const { Schema } = mongoose;

const availabilitySchema = new Schema({
  tutor: { 
    type: Schema.Types.ObjectId, 
    ref: "TutorProfile", 
    required: true 
  },
  dayOfWeek: { 
    type: String, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  }, // HH:mm
  endTime: { 
    type: String, 
    required: true 
  },
  isRecurring: { 
    type: Boolean, 
    default: true 
  },
}, {timestamps: true});

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;
