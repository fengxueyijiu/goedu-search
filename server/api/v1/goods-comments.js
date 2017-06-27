const GoodsComment = require('../../models/goods-comment')
const config = require('../../config/config')

exports.index = (req, res, next) => {
  GoodsComment.find({goods: req.body.goodsId})
    .populate('user')
    .exec()
    .then(comments => {
      res.status(200).json({comments})
    })
    .catch(next)
}
