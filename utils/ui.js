const ShowToast = function(title) {
  wx.showToast({
    icon: 'none',
    duration: 2000,
    title
  })
}
export{
  ShowToast
}