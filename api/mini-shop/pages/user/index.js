let App = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		vip: false, //是否是分销会员
    display: 'none'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
    let that = this;
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		// 获取当前用户信息
		let that = this;
    wx.getStorage({
      key: 'myFlag',
      success: function (res) {
        if (res.data == '1') {
          wx.getStorage({
            key: 'user_id',
            success: function (res) {
              that.getUserDetail();
              that.setData(
                {
                  display: 'block'
                }
              )
            },
            fail() {
              that.getUserDetail();
            }
          })
          
        } else if (res.data == '2') {
          that.goShopping();
        }else {
          wx.getStorage({
            key: 'user_id',
            success: function(res) {
              that.getUserDetail();
              that.setData(
                {
                  display: 'block'
                }
              )
            },
            fail(){
              that.goShopping();
            }
          })
        }

      },
    });
	},
  getUserDetail: function () {
    let _this = this;
    //获取用户信息
    App._get('user.index/detail', {}, function (result) {
      _this.setData(result.data);
			let distId = result.data.userInfo.dist_user_id
      if (distId&& distId !== "0") {
				_this.setData({
					vip:true
				})
			}else{
				_this.setData({
					vip:false
				})
			}
    });
  },
  /**
 * 去购物
 */
  goShopping: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },


})
