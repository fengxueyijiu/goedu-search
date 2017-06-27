import React, { Component } from 'react'
import axios from 'axios'
import { settings } from '../../settings'
import moment from 'moment'
import '../../styles/item-details.css'

import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import GoodsList from './GoodsList'

import Modal from 'antd/lib/modal'
const confirm = Modal.confirm

class Shop extends Component {
  state = {
    shop: {},
    goods: [],
    message: ''
  }

  componentWillMount() {
    axios.get(`${settings.api}/shops/${this.props.match.params.shopId}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          shop: res.data.shop,
          goods: res.data.goods,
        })
      })
  }

  deleteShop = () => {
    const shopId = this.props.match.params.shopId
    axios.delete(`${settings.api}/shops/${shopId}`)
      .then(res => {
        this.setState({message: res.data.message})
        this.timeout = setTimeout(() => {
          this.props.history.push('/dashboard/shops')
        }, 1500)
      })
  }


  showConfirm = () => {
    confirm({
      title: '确认删除学校？',
      onOk: () => {
        this.deleteShop()
      },
      onCancel() {},
    })
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  render() {
    const shop = this.state.shop

    return (
      <div className='single page'>

        <div className='white-block details'>
          <div className='title'>店铺信息</div>
          <div className='block'>
            <div className='label'>商铺账号</div>
            <div>{shop.manager ? shop.manager.email : ''}</div>
          </div>
          <div className='block'>
            <div className='label'>名称</div>
            <div>{shop.name}</div>
          </div>
          <div className='block'>
            <div className='label'>入驻费用</div>
            <div>{shop.settledFee}</div>
          </div>
          <div className='block'>
            <div className='label'>入驻时间</div>
            <div>{moment(shop.createdAt).format('YYYY-MM-DD kk:mm:ss')}</div>
          </div>
          <div className='block'>
            <div className='label'>到期时间</div>
            <div>{moment(shop.settledExpiredDate).format('YYYY-MM-DD kk:mm:ss')}</div>
          </div>
        </div>

        {this.state.goods.length !== 0 ? <GoodsList goods={this.state.goods} /> : ''}


        <div style={{marginTop: 30}} className='white-block clearfix'>
          <div className='title'>操作</div>
          {this.state.message !== '' ? (
            <Alert
              message={this.state.message}
              type="success"
              showIcon
            />
          ) : ''}

          <Button type='danger' onClick={this.showConfirm}>删除店铺</Button>
        </div>
      </div>
    )
  }
}

export default Shop
