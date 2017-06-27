const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolSchema = new Schema(
  {
    name: { type: String },
    cover: { type: String },
    poster: [String],
    provice: String,
    city: String,
    county: String,
    address: String,
    intro: String,
    level: String,
    score: String,
    contact: [String],
    banner: [String],
    hot: Boolean,
    star: Boolean,
    hotExpiredDate: Date,
    starExpiredDate: Date,
    settledFee: String,
    settledExpiredDate: Date,
  },
  {timestamps: true}
)

SchoolSchema.index({createdAt: -1})
SchoolSchema.index({hot: -1})
SchoolSchema.index({star: -1})

module.exports = mongoose.model('School', SchoolSchema)
