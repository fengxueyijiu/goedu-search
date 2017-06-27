const CourseCat = require('../../models/course-cat')

exports.new = (req, res, next) => {
  const cat = new CourseCat()

  CourseCat.findOne({name: req.body.parent})
    .exec()
    .then(parent => {
      const ancestors = [parent].concat(parent.ancestors)
      cat.name = req.body.cat
      cat.parent = parent._id
      cat.ancestors = ancestors

      return cat.save()
        .then(cat => {
          return res.status(200).json({
            cat: cat,
            message: '分类创建成功了！'
          })
        })
    })
    .catch(next)
}

exports.update = (req, res, next) => {
  const id = req.params.catId
  const name = req.body.cat
  Promise.all([
    CourseCat.update({_id: id}, {$set: {name: name}}).exec(),
    CourseCat.update({'ancestors._id': id}, {$set: {'ancestors.$.name': name}}, {multi: true}).exec()
  ])
    .then((results) => {
      return res.json({
        message: '分类更新成功了！'
      })
    })
    .catch(next)
}

exports.delete = (req, res, next) => {
  Promise.all([
    CourseCat.remove({parent: req.params.catId}),
    CourseCat.remove({_id: req.params.catId})
  ])
  .then(() => {
    return res.json({
      id: req.params.catId,
      message: '分类删除成功了！'
    })
  })
  .catch(next)
}

exports.all = (req, res, next) => {
  CourseCat.find({})
    .exec()
    .then(cats => {
      return res.status(200).json({
        cats: cats
      })
    })
    .catch(next)
}
