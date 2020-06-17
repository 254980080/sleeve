import { FenceGroup } from '../models/fence-group';
import { Judger } from '../models/judger';
import { Cell } from '../models/cell';
import { Spu } from '../../models/spu';

Component({
  properties: {
    spu: Object,
    orderWay: String
  },
  data: {
    fences: Array,
    judger: Object,
    previewImg: String
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return spu
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
      this.TriggerSpecEvent()
    }
  },
  methods: {
    processNoSpec (spu) {
      this.setData({
        noSpec: true
      })
      this.bindSkuData(spu.sku_list[0])
    },
    processHasSpec (spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      const defaultSku = fenceGroup.getDefaultSku()
      if(defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroup(fenceGroup)
    },
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        price: spu.price,
        discountPrice: spu.discount_price,
        title: spu.title
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        price: sku.price,
        discountPrice: sku.discount_price,
        title: sku.title,
        stock: sku.stock
      })
    },
    bindTipData () {
      this.setData({
        skuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKey: this.data.judger.getMissingKeys()
      })
    },
    bindFenceGroup (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },
    setStockStatus(stock, currentCount) {
      this.setData({
        outStock: this.isOutOfStock(stock, currentCount)
      })
    },
    isOutOfStock(stock, currentCount) {
      return stock < currentCount
    },
    onSelectCount(event) {
      const currentCount = event.detail.count
      this.data.currentCount = currentCount
      if (this.data.judger.isSkuIntact) {
        const sku = this.data.judger.getDeterminateSku()
        this.setStockStatus(sku.stock, currentCount)
      }
    },
    TriggerSpecEvent (event) {
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if (noSpec) {
        this.triggerEvent('specChange', {
          noSpec
        })
      } else {
        this.triggerEvent('specChange', {
          noSpec,
          skuIntact: this.data.judger.isSkuIntact(),
          currentValues: this.data.judger.getCurrentValues(),
          missingKey: this.data.judger.getMissingKeys()
        })
      }
    },
    onCellTap (event) {
      const data = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const judger = this.data.judger
      const cell = new Cell(data.spec)
      cell.status = data.status
      judger.judge(cell, x, y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.setStockStatus(currentSku.stock, this.data.currentCount)
      }
      this.bindTipData()
      this.bindFenceGroup(judger.fenceGroup)
      this.TriggerSpecEvent()
    }
  }
})
