import { CellStatus } from '../../core/enum'
class Cell {
  spec
  title
  id
  status = CellStatus.WAITING
  constructor (spec) {
    this.title = spec.value
    this.id = spec.value_id
    this.spec = spec
  }

  getCellCode () {
    return this.spec.key_id + '-' + this.spec.value_id
  }
}
export {
  Cell
}