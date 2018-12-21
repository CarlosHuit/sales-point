import mongoose, { Schema } from 'mongoose'

const DevolutionSchema = new Schema(
  {
    product:        { type: Schema.Types.ObjectId,  ref: 'Product'  },
    registerBy:     { type: Schema.Types.ObjectId,  ref: 'User'  },
    quantity:       { type: Number, required: true  },
    observation:    { type: String, required: true  },
  }
);

export default mongoose.model('Devolution', DevolutionSchema)
