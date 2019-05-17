const app = getApp();

Page({
    data:{
        cartProduct:[]
    },
    onLoad(){
        this.setData({
            cartProduct: app.globalData.userCartProducts
        })
        console.log("this is cart page!!!!",this.data.cartProduct)
    },

    deleteOne: function (event) {
        console.log(event.currentTarget.dataset.item);
        this.data.cartProduct = this.data.cartProduct.filter(function (param) {
           return !param.name === event.currentTarget.dataset.item.name;
        });
         console.log( this.data.cartProduct);
        app.globalData.userCartProducts =  this.data.cartProduct;
    },
    toShop: function () {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    handleChange({detail}){
        console.log(detail);
        this.setData({
            current: detail.key,
        });

        let page =  "../cart/cart";
        switch (detail.key) {
            case "homepage":
                page = "../index/index";
                break;
            case "mine":
                page = "../user/user";
                break;
        }
        wx.navigateTo({
            url: page
        });
    },
});
