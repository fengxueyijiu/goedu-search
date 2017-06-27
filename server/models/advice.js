const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdviceSchema = new Schema(
  {
    message: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
)

module.exports = mongoose.model('Advice', AdviceSchema)
