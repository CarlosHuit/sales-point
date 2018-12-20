import mongoose, { Schema } from 'mongoose'

const TransactionsSchema = new Schema(
  {
    product:         { type: Schema.Types.ObjectId,  ref: 'Product' },
    quantity:        { type: Number,                 required: true },
    typeTransaction: { type: String,                 required: true },
  }
)

const ExistencesSchema = new Schema(
  {
    product:        { type: Schema.Types.ObjectId,  ref: 'Product'  },
    existences:     { type: Number, min: 0,         required: true  },
    transactions:   [ TransactionsSchema ],
  }
);

export default mongoose.model('Existence', ExistencesSchema)
