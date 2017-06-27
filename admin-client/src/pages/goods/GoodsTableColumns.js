import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const CourseTableColumns = [{
  title: '商品名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '长标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '价格',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '快递费',
  dataIndex: 'expressFee',
  key: 'expressFee',
}, {
  title: '简介',
  dataIndex: 'intro',
  key: 'intro',
}, {
  title: '上架日期',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  },
}, {
  title: '操作',
  dataIndex: '_id',
  key: '_id',
  render: (text) => {
    return <Link to={`/dashboard/goods/${text}`}>查看</Link>
  },
}]

export default CourseTableColumns
