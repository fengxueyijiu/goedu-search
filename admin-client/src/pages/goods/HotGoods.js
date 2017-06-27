import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'
import GoodsTableColumns from './GoodsTableColumns'


class HotGoods extends Component {
  state = {
    goods: [],
  }

  componentWillMount() {
    axios.get(`${settings.api}/goods/hot`)
      .then((res) => {
        this.setState({goods: res.data.goods})
      })
  }

  render() {
    return (
      <div className='page'>
        <div className='white-block'>
          <Table columns={GoodsTableColumns}
            dataSource={this.state.goods}
            pagination={{
              defaultPageSize: settings.goodsPageSize
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default HotGoods
