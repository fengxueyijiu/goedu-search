// pages/schools/schools.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
     courses: []
   },
   onLoad: function() {
     var that = this
     wx.request({
       url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
       success: function(res) {
         that.setData({courses: res.data.published})
       },
       fail: function() {
         console.log('fail')
       }
     })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
