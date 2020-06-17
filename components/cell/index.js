// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    y: Number,
    x: Number
  },
  data: {

  },
  methods: {
    onTap(event) {
      this.triggerEvent('celltap', {
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})
