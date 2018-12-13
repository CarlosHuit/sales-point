import mongoose, { Schema } from 'mongoose'

const PriceSchema = new Schema({

  changedBy:      { type: Schema.Types.ObjectId,  ref: 'User'    },
  product:        { type: Schema.Types.ObjectId,  ref: 'Product' },
  date:           { type: Date,   required: true, maxlength: 100, minlength: 8 },
  costPrice:      { type: Number, required: true },
  salesPrice:     { type: Number, required: true },

});

export default mongoose.model('Price', PriceSchema)
