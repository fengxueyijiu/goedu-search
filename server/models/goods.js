const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsSchema = new Schema(
  {
    name: String,
    title: String,
    intro: String,
    price: String,
    expressFee: String,
    hot: Boolean,
    shop: {type: Schema.Types.ObjectId, ref: 'Shop'},
    category: {type: Schema.Types.ObjectId, ref: 'GoodsCat'},
  },
  {timestamps: true}
)

module.exports = mongoose.model('Goods', GoodsSchema, 'goods')
