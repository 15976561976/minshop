function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, r = e.getDate(), u = e.getHours(), i = e.getMinutes(), g = e.getSeconds();
        return [ n, o, r ].map(t).join("/") + " " + [ u, i, g ].map(t).join(":");
    }
};

var Promise = 'https://cdn.bootcss.com/bluebird/3.5.0/bluebird.min.js'
 
module.exports = {
  promisify: api => {
    return (options, ...params) => {
      return new Promise((resolve, reject) => {
        const extras = {
          success: resolve,
          fail: reject
        }
        api({ ...options, ...extras }, ...params)
      })
    }
  }
}