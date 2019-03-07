let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    APP_ID: 'wx765f3c6c165541a5',
    APP_SECRET: '8970ad50245f319fe562a7500f55c147'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.scene = options.scene;
    wx.setStorage({
      key: 'myFlag',
      data: '2',
    })
  },

  /**
   * 授权登录
   */
  authorLogin: function (e) {
    let _this = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({ title: "正在登录", mask: true });
    // 执行微信登录
    wx.login({
      success: function (res) {
        // 发送用户信息
        App._post_form('user/login'
          , {
            code: res.code,
            user_info: e.detail.rawData,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
            signature: e.detail.signature
          }
          , function (result) {
            // 记录token user_id
            wx.setStorageSync('token', result.data.token);
            wx.setStorageSync('user_id', result.data.user_id);
            //绑定好友
            wx.getStorage({
                key: 'scene',
                success(res) {
                  if(res.data != 'undefined') {
                    App._post_form('dist_user/bindFriRelation', {
                      dist_user_id: res.data,
											token:result.data.token,
											user_id:result.data.user_id
                    }, function (friend) {
                      console.log(friend)
                    }, function (e) {
                      console.log(e)
                    }, function () {

                    });
                  } 
                }
             })
            

            // 跳转回原页面
            _this.navigateBack();
          }
          , false
          , function () {
            wx.hideLoading();
          });
      }
    });
  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    wx.navigateBack();
    // let currentPage = wx.getStorageSync('currentPage');
    // wx.redirectTo({
    //   url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
    // });
  },
  setFlag() {
    wx.setStorage({
      key: 'myFlag',
      data: '3',
    })
  }
})