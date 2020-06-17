import { Http } from '../utils/http'
class Categories {
  roots = []
  subs = []
  async getAll () {
    const data =  await Http.request({
      url: `category/all`
    })
    this.roots = data.roots
    this.subs = data.subs
  }
  getRoots () {
    return this.roots
  }
  getRoot (rootId) {
    return this.roots.find(r => r.id == rootId)
  }
  getSubs (rootId) {
    return this.subs.filter(s => s.parent_id === rootId)
  }
}
export {
  Categories
}