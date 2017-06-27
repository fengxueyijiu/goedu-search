import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GoodsList extends Component {
  render = () => {
    const list = this.props.goods.map((item, index) => (
      <div key={index}>
        {item.name}
        <Link to={`/dashboard/goods/${item._id}`}>查看</Link>
      </div>
    ))
    return (
      <div style={{marginTop: 30}} className='white-block clearfix'>
        <div className='title'>店铺商品</div>
        <div>{list}</div>
      </div>
    )
  }
}

export default GoodsList
