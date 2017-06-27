import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const SchoolTableColumns = [{
  title: '校方账号',
  dataIndex: 'manager',
  key: 'manager',
},
{
  title: '学校名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '所在城市',
  dataIndex: 'city',
  key: 'city',
}, {
  title: '所在区县',
  dataIndex: 'county',
  key: 'county',
}, {
  title: '入驻时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  },
}, {
  title: '到期时间',
  dataIndex: 'settledExpiredDate',
  key: 'settledExpiredDate',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  },
}, {
  title: '入驻费用',
  dataIndex: 'settledFee',
  key: 'settledFee',
}, {
  title: '操作',
  dataIndex: '_id',
  key: '_id',
  render: (text) => {
    return <Link to={`/dashboard/schools/${text}`}>查看</Link>
  },
}]

export default SchoolTableColumns
