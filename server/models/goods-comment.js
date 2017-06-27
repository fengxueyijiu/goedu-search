const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsCommentSchema = new Schema(
  {
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    goods: {type: Schema.Types.ObjectId, ref: 'Goods'},
  },
  { timestamps: true }
)

module.exports = mongoose.model('GoodsComment', GoodsCommentSchema, 'goodsComments')
