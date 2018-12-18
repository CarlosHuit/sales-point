import mongoose, { Schema } from 'mongoose'

const ArticlesSchema = new Schema(
  {
    product:   { type: Schema.Types.ObjectId,  ref: 'Product' },
    quantity:  { type: Number, required: true },
    date:      { type: Date, required: true },
    priceSale: { type: Number, required: true },
  }
)

const OrdersSchema = new Schema(
  {
    billedBy:       { type: Schema.Types.ObjectId,  ref: 'User'    },
    client:         { type: Schema.Types.ObjectId,  ref: 'Client'  },
    dateBilled:     { type: Date,   required: true, maxlength: 100, minlength: 8 },
    total:          { type: Number, required: true },
    received:       { type: Number, required: true },
    articles:       [ ArticlesSchema ],
  }
);

export default mongoose.model('Order', OrdersSchema)
