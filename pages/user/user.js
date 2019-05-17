Page({
    data: {

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
            case "cart":
                page = "../cart/cart";
                break;
        }
        wx.navigateTo({
            url: page
        });
    },
 }
);
