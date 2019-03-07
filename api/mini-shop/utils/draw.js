let draw = {

  /**
   * 绘制图片
   * let imagesInfo = [
      {
        src: '/0000.jpg',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      }
    ]
   */
  drawImage(canvasid, imagesInfo) {
    let context = wx.createCanvasContext(canvasid, this);
    for (let img of imagesInfo) {
      context.drawImage(img.src, img.x, img.y, img.width, img.height);
    }
    context.draw(true, function() {
    });

  },
  /**
   * 通用base64图片转换为图片文件
   */
  base64ToImage(base64, filePath) {
    let that = this;
    let buffer = wx.base64ToArrayBuffer(base64);
    let fs = wx.getFileSystemManager();
    fs.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success(res) {
        
      },
      fail(res) {

      }
    });
  },

  /**
   * 小程序base64转图片
   * return图片路径
   */
  wxBase64ToImage(wxBase64, fileName) {
    let [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(wxBase64);
    let qrcodeImgSrc = `${wx.env.USER_DATA_PATH}/${fileName}.${format}`;
    this.base64ToImage(bodyData, qrcodeImgSrc);
    return qrcodeImgSrc;
  }
}
module.exports = draw;