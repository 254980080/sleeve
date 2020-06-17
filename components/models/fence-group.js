import { Matrix } from "./matrix";
import { Fence } from "./fence";

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
   this.spu = spu
   this.skuList = spu.sku_list
  }
  getSku (skuCode) {
    const fullCode = this.spu.id + '$' + skuCode
    const sku = this.skuList.find(s => s.code === fullCode)
    return sku
  }
  
  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const AT = matrix.transpose()
    const fences = []
    AT.forEach((r) => {
      const fence = new Fence(r)
      fence.init()
      if (this._hasSketchFence && this._isSketchFence(fence.id)) {
        fence.setFenceSketch(this.skuList)
      }
      fences.push(fence)
    })
    this.fences = fences
  }

  _hasSketchFence(fence) {
    return this.spu.sketch_spec_id ? true : false
  }

  _isSketchFence(fenceId) {
    return this.spu.sketch_spec_id === fenceId ? true : false
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }

  eachCell (cb) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        cb(this.fences[i].cells[j], i, j)
      }
    }
  }
  setCellStatusById(cellId, status) {
    this.eachCell(cell => {
      if (cell.id === cellId) {
        cell.status = status
      }
    })
  }
  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status
  }
  getDefaultSku() {
    const defaultSkuId = this.spu.default_sku_id
    if (!defaultSkuId) {
      return
    }
    return this.skuList.find(s => s.id === defaultSkuId)
  }

}
export {
  FenceGroup
}