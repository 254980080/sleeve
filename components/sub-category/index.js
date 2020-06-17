
Component({
 
  properties: {
    categories: null,
    bannerImg: null
  },
  data: {

  },

  methods: {
    onTapGridItem (event) {
      const id = event.detail.key
      this.triggerEvent('itemtap', {
        cid: id
      })
    }
  }
})
