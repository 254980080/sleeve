
Component({
  
  properties: {
    
  },
  
  data: {

  },
  
  methods: {
    onGotoHome(event) {
      this.triggerEvent('gotohome')
    },
    onGotoCart(event) {
      this.triggerEvent('gotocart')
    },
    onAddToCart(event) {
      this.triggerEvent('addtocart')
    },
    onBuy(event) {
      this.triggerEvent('buy')
    }
  }

})
