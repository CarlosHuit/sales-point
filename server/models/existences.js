import mongoose, { Schema } from 'mongoose'

const TransactionsSchema = new Schema(
  {
    order:           { type: Schema.Types.ObjectId,  ref: 'Order'    },
    quantity:        { type: Number, required: true },
    typeTransaction: {
      type: String,
      enum: ['SAVEN', 'ENCOM', 'ENDEV', 'SAFAL', 'ENSOB'],
      required: true,
      maxlength: 10
    },
  }
)

const ExistencesSchema = new Schema(
  {
    product:        { type: Schema.Types.ObjectId,  ref: 'Product'  },
    existences:     { type: Number, required: true  },
    transactions:   [ TransactionsSchema ],
  }
);

export default mongoose.model('Existence', ExistencesSchema)
