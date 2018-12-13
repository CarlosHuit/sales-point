import mongoose, { Schema } from 'mongoose'

const ProviderSchema = new Schema({
  registerBy:  { type: Schema.Types.ObjectId, ref: 'User' },
  name:        { type: String, required: true, maxlength: 200, minlength: 10 },
  tel:         { type: Number, required: true, maxlength: 20,  minlength: 8  },
});

export default mongoose.model('Provider', ProviderSchema)
