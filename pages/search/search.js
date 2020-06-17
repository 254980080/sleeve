import { HistoryKeyword } from '../../models/history-keyword'
import { Tag } from '../../models/tag'
import { Search } from '../../models/search'
import { ShowToast } from '../../utils/ui'

const history = new HistoryKeyword()
Page({

  data: {

  },

  onLoad:async function (options) {
    const historyTags = history.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },
  async onSearch(event) {
    this.setData({
      search: true,
      items: []
    })
    let keyword = event.detail.value || event.detail.name
    if (!keyword) {
      ShowToast('请输入关键字')
      return
    }
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })
    const paging = Search.search(keyword)
    wx.lin.showLoading({
      color: "#157658",
      type: 'flash',
      fullScreen: true
    })
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    this.bindItems(data)
  },
  bindItems(data) {
    if (!data.accumulator.length !== 0) {
      this.setData({
        items:data.accumulator
      })
    }
  },
  onCancel () {
    this.setData({
      search: false
    })
  },
  onDeleteHistory() {
    history.clear()
    this.setData({
      historyTags: []
    })
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})