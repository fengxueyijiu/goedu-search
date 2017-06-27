const Shop = require('../../models/shop')
const Goods = require('../../models/goods')
const config = require('../../config/config')
const Q = require('q')

// 店铺列表
exports.index = (req, res, next) => {
  let page = parseInt(req.query.page, 10) || 1
  page = page > 0 ? page : 1
  const limit = Number(req.query.limit) || config.shopPageSize
  const query = {}
  const options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: '-createdAt'
  }

  if(page === 1) {
    Q.all([
      Shop.count(),
      Shop.find(query, '', options).exec()
    ])
    .then(results => {
      res.status(200).json({
        total: results[0],
        shops: results[1]
      })
    })
    .done()
  } else {
    Shop.find(query, '', options)
      .exec()
      .then((shops) => {
        res.status(200).json({shops})
      })
      .catch(next)
  }
}

// 店铺详情
exports.single = (req, res, next) => {
  Shop.findById({_id: req.params.shopId})
    .exec()
    .then((shop) => {
      return Goods.find({shop: shop._id})
        .exec()
        .then(goods => {
          res.status(200).json({shop, goods})
        })
    })
    .catch(next)
}

// 删除店铺
exports.delete = (req, res, next) => {
  Shop.findById({_id: req.params.shopId})
    .exec()
    .then((shop) => {
      return shop.remove().then(() => {
        res.status(200).json({message: '店铺删除成功！'})
      })
    })
    .catch(next)
}
