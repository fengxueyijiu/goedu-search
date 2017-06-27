import React, { Component } from 'react'
import axios from 'axios'
import { settings } from '../../settings'
import moment from 'moment'
import '../../styles/item-details.css'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import { Link } from 'react-router-dom'
import GoodsComments from './GoodsComments'

class SingleGoods extends Component {
  state = {
    goods: {},
    comments: [],
    message: ''
  }

  componentWillMount() {
    axios.get(`${settings.api}/goods/${this.props.match.params.goodsId}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          goods: res.data.goods,
          comments: res.data.comments
        })
      })
  }

  setHotGoods = () => {
    const goodsId = this.props.match.params.goodsId
    axios.post(`${settings.api}/goods/hot`, {goodsId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  cancelHotGoods = () => {
    const goodsId = this.props.match.params.goodsId
    axios.put(`${settings.api}/goods/hot`, {goodsId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  render() {
    let goods = this.state.goods

    return (
      <div className='single page'>

        <div className='white-block details'>
          <div className='title'>商品信息</div>
          <div className='block'>
            <div className='label'>所属店铺</div>
            <Link to={`/dashboard/shops/${goods.shop ? goods.shop._id : ''}`}>
              {goods.shop ? goods.shop.name : ''}
            </Link>
          </div>
          <div className='block'>
            <div className='label'>商品名</div>
            <div>{goods.name}</div>
          </div>
          <div className='block'>
            <div className='label'>长标题</div>
            <div>{goods.title}</div>
          </div>
          <div className='block'>
            <div className='label'>价格</div>
            <div>{goods.price}</div>
          </div>
          <div className='block'>
            <div className='label'>商品简介</div>
            <div>{goods.intro}</div>
          </div>
          <div className='block'>
            <div className='label'>上架日期</div>
            <div>{ moment(goods.createdAt).format('YYYY-MM-DD kk:mm:ss') }</div>
          </div>
        </div>

        <GoodsComments comments={this.state.comments} />

        <div style={{marginTop: 30}} className='white-block clearfix'>
          <div className='title'>操作</div>
          {this.state.message !== '' ? (
            <Alert
              message={this.state.message}
              type="success"
              showIcon
            />
          ) : ''}
          { goods.hot ? <Button onClick={this.cancelHotGoods}>取消热门商品</Button> : <Button onClick={this.setHotGoods}>设置热门商品</Button>}

        </div>
      </div>
    )
  }
}

export default SingleGoods
