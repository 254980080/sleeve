import { combination } from '../../utils/util'
class SkuCode {
  code
  totalSegsments = []
  constructor (code) {
    this.code = code
    this._splitToSegments()
  }
  _splitToSegments () {
    const spuAndSpec = this.code.split('$')
    const spuId = spuAndSpec[0]
    const specCodeArray = spuAndSpec[1].split('#')
    const length = specCodeArray.length
    for (let i = 1; i <= length; i++) {
      const segments = combination(specCodeArray, i)
      const newSegments = segments.map(segs => {
        return segs.join('#')
      })
      this.totalSegsments = this.totalSegsments.concat(newSegments)
    }
  }
}
export {
  SkuCode
}