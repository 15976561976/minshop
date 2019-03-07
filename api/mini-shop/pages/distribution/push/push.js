var draw = require("../../../utils/draw.js")
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    var that = this
    //获取手机信息宽高
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight
        })
      }
    })
    //图片数据
    let postBg = {
      src: null,
      x: 0,
      y: 0,
      width: this.data.screenWidth,
      height: this.data.screenHeight
    }
    this.setData({
      postBg,
    });

    let qrcodeInfo = {
      src: null,
      x: this.data.screenWidth * 0.5 - this.data.screenHeight * 0.180623973727422 / 2,
      y: this.data.screenHeight * 0.0796 + this.data.screenWidth * 0.0933 + 30,
      width: this.data.screenHeight * 0.180623973727422,
      height: this.data.screenHeight * 0.180623973727422
    }
    this.setData({
      qrcodeInfo,
    });

    let userInfo = {
      src: null,
      x: this.data.screenWidth * 0.5 - 60,
      y: 134.22,
      width: this.data.screenWidth * 0.1815,
      height: this.data.screenWidth * 0.1815
    }
    this.setData({
      userInfo,
    });
    //检测海报图片在本地是否有保存
    wx.getStorage({
      key: 'poster',
      success(res) {
        let path = res.data;
        let fs = wx.getFileSystemManager();
        //检测是否能否获取文件
        fs.access({
          path,
          //获取成功，直接绘制图片
          success() {
            draw.drawImage('customCanvas', [{
              src: path,
              x: 0,
              y: 0,
              width: that.data.screenWidth,
              height: that.data.screenHeight
            }]);
          },
          //获取失败，重新创建海报图片，并把路径信息写入缓存
          fail() {
            that.drawPoster(that, function() {
              wx.canvasToTempFilePath({
                canvasId: 'customCanvas',
                success(res) {
                  wx.setStorage({
                    key: 'poster',
                    data: res.tempFilePath,
                  });
                }
              }, this);
            });
          }
        })
      },
      //缓存中没有路径信息，重新创建海报图片，并把路径信息写入缓存
      fail() {
        that.drawPoster(that, function() {
          wx.canvasToTempFilePath({
            canvasId: 'customCanvas',
            success(res) {
              wx.setStorage({
                key: 'poster',
                data: res.tempFilePath,
              });
              wx.hideLoading();
            }
          }, this);
        });
      }
    })

  },
  /**
   * 绘制海报
   */
  drawPoster(t, createImg) {
    let that = t;
    //开始绘制海报
    wx.showLoading({
      title: '生成中...',
    })
    var ctx = wx.createCanvasContext('customCanvas');
    //先下载背景图片
    wx.downloadFile({
      url: 'https://shop.t.sayingdata.com/uploads/201901120958208b0798710.jpg',
      success(res) {
        that.data.postBg.src = res.tempFilePath;
      },
      complete(res) {
        //先绘制背景图片
        draw.drawImage('customCanvas', [that.data.postBg]);
        //获取用户头像和称昵，并绘制二维码、头像、标题等信息
        wx.getUserInfo({
          success(res) {
            that.setData({
              url: res.userInfo.avatarUrl,
              nickname: res.userInfo.nickName
            });
          },
          complete(res) {
            //绘制二维码
            //获取小程序码
            App._get("wxappcode/code", null, function(res) {
              that.setData({
                pushimg: res.data.result
              });
              that.setData({
                'qrcodeInfo.src': draw.wxBase64ToImage(that.data.pushimg, 'tmp_qrcode')
              }, () => {
                draw.drawImage('customCanvas', [that.data.qrcodeInfo]);
              });
              //绘制头像、标题
              wx.getUserInfo({
                success(res) {
                  that.data.userInfo.src = res.userInfo.avatarUrl;
                  //头像下载图片到本地
                  wx.downloadFile({
                    url: that.data.userInfo.src,
                    complete(res) {
                      that.data.userInfo.src = res.tempFilePath;
                      that.setData({
                        aaa: that.data.userInfo.src
                      })
                      //绘制头像
                      that.data.url = that.data.userInfo.src;
                      // draw.drawImage('customCanvas', [that.data.userInfo]);
                      that.setNickname(ctx);
                      //绘制标题
                      that.setTitle(ctx);
                      ctx.draw(true, function() {
                        createImg();
                      });
                    }
                  })
                },
              })
            })
          }
        });
      }
    });
  },
  //第一步绘制用户称昵
  setTitle: function(ctx) {
    var title = this.data.nickname;
    ctx.setFontSize(18); //设置字体大小，默认10
    ctx.setTextAlign('center'); //文字对齐方式
    ctx.setFillStyle('#000'); //文字颜色：默认黑色
    //注意这里的this，不能用that
    ctx.fillText(title, this.data.screenWidth * 0.5, this.data.screenHeight * 0.0796 + this.data.screenWidth * 0.0933 + 20) //绘制文本
  },
  //第二步绘制二维码图片
  setQrcode: function(ctx) {
    ctx.drawImage(this.data.mycode, this.data.screenWidth * 0.5 - 60, 134.22, 120, 120) //绘制图片
  },
  //第二步绘制用户头像
  setNickname: function(ctx) {
    ctx.save() //保存当前的绘图上下文。
    ctx.beginPath() //开始创建一个路径
    ctx.arc(this.data.screenWidth * 0.5, this.data.screenHeight * 0.0796, this.data.screenWidth * 0.0933, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
    ctx.clip() //裁剪
    ctx.drawImage(this.data.url, this.data.screenWidth * 0.5 - this.data.screenWidth * 0.0934, this.data.screenHeight * 0.0796 - this.data.screenWidth * 0.0933, this.data.screenWidth * 0.1851, this.data.screenWidth * 0.1851) //绘制图片
    ctx.restore() //恢复之前保存的绘图上下文
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //生成朋友圈分享图
    // wx.showToast({
    //   title: '生成中...',
    //   icon: 'loading',
    //   duration: 10000
    // })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onLongTouch(e) {
    wx.getStorage({
      key: 'poster',
      success: function(res) {
        wx.previewImage({
          urls: [res.data],
        })
      },
    })

  }
})