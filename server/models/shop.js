const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema(
  {
    name: { type: String },
    banner: [String],
    settledFee: String,
    settledExpiredDate: Date,
    manager: {type: Schema.Types.ObjectId, ref: 'Manager'},
  },
  {timestamps: true}
)

ShopSchema.index({createdAt: -1})

module.exports = mongoose.model('Shop', ShopSchema)
