import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  
  qrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Qr',   
    default: null
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',   
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  redirectionUrl: {
    type: String,
    required: true
  }
});

const Slot = mongoose.model("Slot", slotSchema)

export default Slot