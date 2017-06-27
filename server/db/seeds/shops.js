const mongoose = require('mongoose')
const config = require('../../config/config')
const Q = require('q')

mongoose.Promise = global.Promise
mongoose.connect(config.db)

const Shop = require('../../models/shop')
const Goods = require('../../models/goods')
const GoodsComment = require('../../models/goods-comment')

const shops = []
const goods = []

for(let i = 0; i < 10; i++) {
  shops.push({
    name: 'shop' + i,
    settledFee: 'settledFee' + i,
    settledExpiredDate: Date.now(),
  })
}

for(let i = 0; i < 3; i++) {
  goods.push({
    name: 'goods' + i,
    title: 'title' + i,
    price: 'price' + i,
    expressFee: 'expressFee' + i,
    intro: 'intro' + i,
  })
}

const insertGoods = () => {
  return Shop.find({}, '', {limit: 10})
    .select('_id')
    .exec()
    .then(shops => {
      return shops.map(shop => {
        const newGoods = goods.map(item => {
          // must return a new course object
          return Object.assign({}, item, {shop: shop._id})
        })
        return Goods.insertMany(newGoods)
      })
    })
}

const insertGoodsComments = () => {
  return Goods.find({}, '', {limit: 10})
    .select('_id')
    .exec()
    .then(goods => {
      return goods.map((item, index) => {
        const comments = Array.from(Array(index).keys()).map(n => {
          return Object.assign({}, {content: 'comment' + n, goods: item._id})
        })
        return GoodsComment.insertMany(comments)
      })
    })
}

Q.all([
  Shop.remove({})
    .then(() => {
      return Shop.insertMany(shops)
    }),
  Goods.remove({}),
  GoodsComment.remove({}),
])
.then(() => {
  return Q.all(insertGoods())
})
.then(() => {
  return Q.all(insertGoodsComments())
})
.then(() => {
  console.log('数据库中注入商户数据完毕!')
  process.exit(0)
})
.catch(err => {
  console.log(err)
})
