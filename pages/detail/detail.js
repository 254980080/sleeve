import { Spu } from '../../models/spu';
import { SaleExplain } from '../../models/sale-explain';
import { ShoppingWay } from '../../core/enum';
import { getWindowHeightRpx } from '../../utils/system';
Page({
  data: {
    spu: null,
    explain: null,
    showRealm: false,
    orderWay: null
  },
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    
    const explain = await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100
    this.setData({
      spu,
      explain,
      h
    })
  },
  onSpecChange (event) {
    this.setData({
      specs: event.detail
    })
  },
  onGotoHome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onGotoCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  onAddToCart () {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },
  onBuy() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})