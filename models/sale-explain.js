import { Http } from '../utils/http'
class SaleExplain {
  static async getFixed () {
    const texts =  await Http.request({
      url: `sale_explain/fixed`
    })
    return texts.map(e => {
      return e.text
    })
  }
}
export {
  SaleExplain
}