// components/sale-explain/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    texts: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    _texts: Array
  },
  observers: {
    texts: function (texts) {
      if (!texts) {
        return
      }
      this.setData({
        _texts: texts
      })
    }
  },
  methods: {

  }
})
