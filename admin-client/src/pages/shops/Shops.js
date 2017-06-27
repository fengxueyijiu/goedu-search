import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'
import ShopTableColumns from './ShopTableColumns'


const getShopList = (page, pageSize) => {
  return axios.get(`${settings.api}/shops`, {params: {page: page, limit: pageSize}})
}

class Shops extends Component {
  state = {
    shops: [],
    total: 0,
  }

  componentWillMount() {
    getShopList(1, settings.shopPageSize)
      .then(res => {
        this.setState({
          total: res.data.count,
          shops: res.data.shops
        })
      })
  }

  handlePageChange = (page, pageSize) => {
    getShopList(page, pageSize)
      .then(res => {
        this.setState({shops: res.data.shops})
      })
  }


  render() {
    return (
      <div className='page'>
        <div className='white-block'>
          <div>共{this.state.total}家店铺</div>
          <Table columns={ShopTableColumns}
            dataSource={this.state.shops}
            pagination={{
              total: this.state.total,
              defaultPageSize: settings.shopPageSize,
              onChange: this.handlePageChange,
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default Shops
