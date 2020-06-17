import { Cart } from '../../models/cart'
Component({
  properties: {
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    }
  },
  
  data: {

  },

  methods: {
    onOverStep(event) {
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut === 'overflow_min') {
        wx.showToast({
          icon:'none',
          duration: 3000,
          title: `最少需要购买${Cart.SKU_MIN_COUNT}件`,
        })
      }
      if (minOrMaxOut === 'overflow_max') {
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: '超出购买最大数量',
        })
      }
    }
  }
})
