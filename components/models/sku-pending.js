import { Cell } from './cell'
import { Joiner } from '../../utils/joiner'
class SkuPending {
  pending = []
  size
  constructor (size) {
    this.size = size
  }

  isIntact () {
    for (let i = 0;i < this.size; i++) {
      if (this._isEmptyPart(i)) {
        return false
      }
    }
    return true
  }
  _isEmptyPart (index) {
    return !this.pending[index]
  }

  getCurrentSpecValues () {
    const values = this.pending.map(cell => {
      return cell ? cell.title : null
    })
    return values
  }

  getMissingSpecKeysIndex () {
    const keysIndex = []
    for (let i = 0; i < this.size; i++) {
      if (!this.pending[i]) {
        keysIndex.push(i)
      }
    }
    return keysIndex
  }

  getSkuCode () {
    const joiner = new Joiner('#')
    this.pending.forEach(cell => {
      const cellCode = cell.getCellCode(cell.spec)
      joiner.join(cellCode)
    })
    return joiner.getStr()
  }

  insertCell(cell, x) {
    this.pending[x] = cell
  }

  removeCell(x) {
    this.pending[x] = null
  }

  init (sku) {
    const specs = sku.specs
    for (let i = 0; i < specs.length; i++) {
      const cell = new Cell(specs[i])
      this.insertCell(cell, i)
    }
  }

  findSelectedCellByX (x) {
    return this.pending[x]
  }

  isSelectedByX (cell, x) {
    const pendingCell = this.pending[x]
    if (!pendingCell) {
      return false
    }
    return cell.id === pendingCell.id
  }

}
export {
  SkuPending
}