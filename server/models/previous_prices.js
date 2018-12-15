import mongoose, { Schema } from 'mongoose'

const Prices = new Schema({

  changedBy:  { type: Schema.Types.ObjectId,  ref: 'User'    },
  product:    { type: Schema.Types.ObjectId,  ref: 'Product' },
  date:       { type: Date,   required: true, maxlength: 100, minlength: 8 },
  costPrice:  { type: Number, required: true },
  salesPrice: { type: Number, required: true }

})

const PreviousPrices = new Schema({

  product:    { type: Schema.Types.ObjectId, ref: 'Product' },
  historial:  [ Prices ]

});

export default mongoose.model('Previous_Prices', PreviousPrices)
