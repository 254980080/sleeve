import { getSystemSize } from '../../utils/system';
import { px2rpx } from '../../miniprogram_npm/lin-ui/utils/util';
import { Categories } from '../../models/categories';
import { SpuListType } from '../../core/enum';
Page({

  data: {
    defaultRootId: 2
  },

  async onLoad (options) {
    this.initCategoryData()
    this.setDynamicSegmentHeight()
  },
  async initCategoryData () {
    const categories = new Categories()
    await categories.getAll()
    this.data.categories = categories
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img
    })
    
  },
  getDefaultRoot (roots) {
    const defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
    if (!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },
  onSegChange(event) {
    const defaultRootId = event.detail.activeKey
    const currentRoot = this.data.categories.getRoot(defaultRootId)
    const currentSubs = this.data.categories.getSubs(currentRoot.id)
    this.setData({
      currentSubs,
      currentBannerImg: currentRoot.img
    })
  },
  onJumpToSpuList (event) {
    const cid = event.detail.cid
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },
  async setDynamicSegmentHeight () {
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      segHeight: h
    })
  },
  onGotoSearch () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})