
class HistoryKeyword {
  static MAX_ITEM_COUNT = 20
  static KEY = 'keyword'

  keywords = []
  constructor() {
    if(HistoryKeyword.instance === 'object') {
      return HistoryKeyword.instance
    }
    HistoryKeyword.instance = this
    this.keywords = this._getLocalKeywords()
    return this
  }
  save(value) {
    if(this.keywords.includes(value)) {
      this.keywords.splice(this.keywords.indexOf(value), 1)
    }
    if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      this.keywords.pop()
    }
    this.keywords.unshift(value)
    this._refreshLocal()
  }
  get() {
    return this.keywords
  }
  clear() {
    this.keywords = []
    this._refreshLocal()
  }
  _refreshLocal() {
    wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
  }
  _getLocalKeywords() {
    const keywords = wx.getStorageSync(HistoryKeyword.KEY)
    if (!keywords) {
      wx.setStorageSync(HistoryKeyword.KEY, [])
      return []
    }
    return keywords
  }
}
export {
  HistoryKeyword
}