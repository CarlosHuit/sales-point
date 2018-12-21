import mongoose, { Schema } from 'mongoose'

const DevolutionSchema = new Schema(
  {
    product:        { type: Schema.Types.ObjectId,  ref: 'Product'  },
    registerBy:     { type: Schema.Types.ObjectId,  ref: 'User'  },
    dateDevolution: { type: Date,   required: true, maxlength: 100, minlength: 8 },
    quantity:       { type: Number, required: true  },
    observation:    { type: String, required: true  },
  }
);

export default mongoose.model('Devolution', DevolutionSchema)
