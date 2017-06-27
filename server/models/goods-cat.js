const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsCatSchema = new Schema(
  {
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'GoodsCat'},
  },
  { timestamps: true }
)

module.exports = mongoose.model('GoodsCat', GoodsCatSchema, 'goodsCats')
