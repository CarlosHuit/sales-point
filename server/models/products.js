import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    registerBy:  { type: Schema.Types.ObjectId, ref: 'User' },
    barcode:     { type: String, required: true, maxlength: 200, minlength: 10 },
    sku:         { type: Number, required: true, maxlength: 100, minlength: 3  },
    description: { type: String, required: true, maxlength: 300, minlength: 20 },
  }
);


export default mongoose.model('Product', ProductSchema)
