import React from 'react'

const GoodsCommentList = ({comments}) => {
  const list = comments.map((comment, index) => (
    <div key={index}>{comment.content}</div>
  ))
  return (
    <div style={{marginTop: 30}} className='white-block clearfix'>
      <div className='title'>商品评论</div>
      <div>{list}</div>
    </div>
  )
}


export default GoodsCommentList
