// components/spu-description/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  data: {
    tags: Array
  },

  observers: {
    spu: function (spu) {
      if (!spu) {
        return
      }
      if (!spu.tags) {
        return
      }
      const tags = spu.tags.split('$');
      this.setData({
        tags
      })
    }
  },

  methods: {

  }
})
