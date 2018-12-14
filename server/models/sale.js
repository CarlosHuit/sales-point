import mongoose, { Schema } from 'mongoose'

const Products = new Schema({
  product:   { type: Schema.Types.ObjectId, ref: 'Product'},
  date:      { type: Date,    required: true },
  quantity:  { type: Number,  required: true }
})

const SaleSchema = new Schema({
  user:      { type: Schema.Types.ObjectId, ref: 'User'   },
  client:    { type: Schema.Types.ObjectId, ref: 'Client' },
  products:  [ Products ]
});

export default mongoose.model('Sale', SaleSchema)
