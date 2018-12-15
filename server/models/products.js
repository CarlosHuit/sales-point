import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    registerBy:  { type: Schema.Types.ObjectId, ref: 'User' },
    barcode:     { type: String, required: true, maxlength: 200, minlength: 1 },
    sku:         { type: String, required: true, maxlength: 100, minlength: 1  },
    description: { type: String, required: true, maxlength: 300, minlength: 1 },
    price:       { type: Schema.Types.ObjectId, ref: 'Price' },
  }
);


export default mongoose.model('Product', ProductSchema)
