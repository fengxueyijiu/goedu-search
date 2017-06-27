const Goods = require('../../models/goods')
const GoodsComment = require('../../models/goods-comment')
const config = require('../../config/config')


// 热门商品
exports.hot = (req, res, next) => {
  Goods.find({hot: true})
  .exec()
  .then(goods => {
    res.status(200).json({goods})
  })
  .catch(next)
}

// 设置热门商品
exports.markHot = (req, res, next) => {
  Goods.findById({_id: req.body.goodsId})
    .exec()
    .then(goods => {
      goods.hot = true
      return goods.save().then(goods => {
        return res.status(200).json({message: '已经设置为热门商品！'})
      })
    })
    .catch(next)
}

// 取消热门商品
exports.unmarkHot = (req, res, next) => {
  Goods.findById({_id: req.body.goodsId})
    .exec()
    .then(goods => {
      goods.hot = false
      return goods.save().then(goods => {
        res.status(200).json({message: '已经取消热门商品！'})
      })
    })
    .catch(next)
}

// 商品详情
exports.single = (req, res, next) => {
  Goods.findById({_id: req.params.goodsId})
    .exec()
    .then((goods) => {
      return GoodsComment.find({goods: goods._id})
        .populate('user')
        .exec()
        .then(comments => {
          res.status(200).json({goods, comments})
        })
    })
    .catch(next)
}
