import mongoose, { Schema } from 'mongoose'

const ClientSchema = new Schema(
  {
    registerBy:  { type: Schema.Types.ObjectId,  ref: 'User' },
    name:        { type: String, required: true, maxlength: 100, minlength: 2 },
    address:     { type: String, required: true, maxlength: 100, minlength: 2  },
  }
);

export default mongoose.model('Client', ClientSchema)
