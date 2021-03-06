function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toThousands(num) {
    return (num || "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
function timeNum(date) {
  var year = date.getFullYear().toString()
  var month = (date.getMonth() + 1).toString()
  var day = date.getDate().toString()

  var hour = date.getHours().toString()
  var minute = date.getMinutes().toString()
  //var second = date.getSeconds().toString()
  return year+month+day+hour+minute;
}
module.exports = {
  formatTime: formatTime,
  toThousands:toThousands,
  timeNum:timeNum,
}


