// pages/mall/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses:[],
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true    // 全选状态，默认全选
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function(res) {
        that.setData({courses: res.data.published.slice(0,6)})
      },
      fail: function() {
        console.log('fail')
      }
    })
  },

  onShow: function () {
    this.setData({
      hasList: true,        // 既然有数据了，那设为true吧
      carts:[
        {id:1,title:'小天才电话手表Y02智能防水版儿童定位智能手表手环学生手机请留言备注颜色',image:'http://o86bpj665.bkt.clouddn.com/posters/gitbeijing.png',num:4,price:598,selected:true},
        {id:2,title:'小天才电话手表Y03智能防水版儿童定位智能手表手环学生手机请留言备注颜色',image:'http://o86bpj665.bkt.clouddn.com/posters/gitbeijing.png',num:1,price:798,selected:true}
      ]
    });
    this.getTotalPrice();
  },

  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
        if(carts[i].selected) {                   // 判断选中才会计算价格
            total += carts[i].num * carts[i].price;     // 所有价格加起来
        }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
        carts: carts,
        totalPrice: total.toFixed(2)
    });
  },

  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
        carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
  },

  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
        carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
        selectAllStatus: selectAllStatus,
        carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },

  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
      const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);              // 删除购物车列表里这个商品
    this.getTotalPrice();
    this.setData({
        carts: carts
    });
    if(!carts.length){                  // 如果购物车为空
        this.setData({
            hasList: false              // 修改标识为false，显示购物车为空页面
        });
    }else{                              // 如果不为空
        this.getTotalPrice();           // 重新计算总价格
    }
  },

































  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
