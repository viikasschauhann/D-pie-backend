import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  lesson: { type: Schema.Types.ObjectId, 
    ref: "Lesson", 
    required: true 
  },
  amount: { type: Number, 
    required: true 
  },
  method: { type: String, 
    required: true 
  }, // e.g. "Card", "PayPal"
  status: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING",
  },
  paidAt: { type: Date },
}, {timestamps: true});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
