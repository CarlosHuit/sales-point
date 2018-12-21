import mongoose, { Schema } from 'mongoose'

const ArticlesSchema = new Schema(
  {
    product:   { type: Schema.Types.ObjectId,  ref: 'Product' },
    quantity:  { type: Number, required: true },
    date:      { type: Date, required: true },
    priceSale: { type: Number, required: true },
  }
)

const PurchaseSchema = new Schema(
  {
    registerBy:       { type: Schema.Types.ObjectId,  ref: 'User'      },
    provider:         { type: Schema.Types.ObjectId,  ref: 'Provider'  },
    purchaseDate:     { type: Date,   required: true, maxlength: 100, minlength: 8 },
    total:            { type: Number, required: true },
    payment:         { type: Number, required: true },
    articles:         [ ArticlesSchema ],
  }
);

export default mongoose.model('Purchase', PurchaseSchema)
