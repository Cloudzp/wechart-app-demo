//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    current: "homepage",
    cartProductCount: 0,
    productItem: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  observers:{
    'userCartProducts': function(userCartProducts) {
      console.log("test", userCartProducts.length);
      this.setData({
        cartProductCount : userCartProducts.length
      });
    }
  },
  handleChange({detail}){
    console.log(detail);
    this.setData({
      current: detail.key,
    });

    let page =  "../cart/cart";
    switch (detail.key) {
      case "cart":
        page = "../cart/cart";
        break;
      case "mine":
        page = "../user/user";
        break;
    }
    wx.navigateTo({
      url: page
    });
  },

  listProducts: function(){
    let p = [
      {
        id: 0,
        name: "裤衩子",
        price: 9.9,
        describe: "这是一件很有趣的裤衩不信你买一个试试?",
        img: "data:image/jpeg;base64,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16b4Mtlt/DtuVmMm4ZYEAbGGQVrspyUnoeXi04wOiPWkoorqPKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAFKQGG0jg8UgqrqGoRadbiWTczswSONBlnY9ABSk0kOKbehyWteHvM0/zbQSQyW0rI4ibbuUHI6expdE0zR7ja8Mct3KvJM5LBD9DxmvQdE0K6isboakyNNO/nYA4UEY2/h6+tZ2leGGsbu9YSFoJGBjHX615spxufSUo+6rmPqfhLRtbike/t289I8JJDwwwOB9Kjs/hFZ2MK39rOZbvydy21xGsg3Y4+nNdxBpYVgTu+nrV/wC321nKRPLunkPESDcwHYYFZzZckedtY+JNGMB1aOy+yzuI1FnnKMRxntjiut0gpGpRuXYZwetaOp2zazpz2rwyQN/rIpHx8rg5BI+tcppeozQ3lxLqqeQ9pOYii/NuYjovqPSsJ6mtKdlY62SWOOMNyBkDpzk0+SCKZcSxJIAc4dQ386hsy80QnmjKMTuVG6qO3HrVqsbmu5Rl0mykfzGgUSA7g+OQfauL1KL/AIRTXJrhlc6TfkMzKMi3m7kjsrcGvQJPuH5tvvWJHIIbxLW82zRXbOMkAhWHRce4rWjVdOVzCvQVWHKUIJ4rmFZYJFkjYZDIcipKj1Dw5JYzG+0RQnUy2XRJfdf7rfzplrdR3kHmR5GDtZWGCrDqCPWvZo1o1FdHzuIwk6L12J6KKK2OYKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApsjrFGZJGCoOrE4FR3NzFaW7TTNhF/Mn0Hqa0NI8MfbVivddjLyg74bQsdkQ7Fh/E31rKtVVNanRQw7qvyMiK9mvmMWlWNxePnHmbNkQ+rn+mau2WirpWpR6lrzteaieLeC1iZo4fp6n3NdttVUCqAEUcAcAfhSBz1B59a86pXlNHqU8JGGpSt5r+V1ZrPy4ic4dgGx9KZc3SaU7SPDO0EhyxjTcEPr61fVyc57UbycgcCsTsWxS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"
      },
      {
        id: 0,
        name: "达克宁",
        price: 19.9,
        describe: "治脚气",
        img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1067834509,2727772765&fm=26&gp=0.jpg"
      },{
        id: 0,
        name: "青茶",
        price: 9.9,
        describe: "商南青茶",
        img: "https://f11.baidu.com/it/u=3198994856,3080379742&fm=72"
      }
    ];
    this.setData({
        productItem : p
      }
    )
  },

  addToCart: function(event){
    let p = event.currentTarget.dataset.item;
    this.setData({
      cartProductCount : this.data.cartProductCount+1
    });

    app.globalData.userCartProducts.push(p);
  },

  toCartPage: function(){

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.listProducts();
/*    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
