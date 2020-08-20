
function queryStatus() {
  // 读取数据，第一个参数是指定要读取的key以及设置默认值
  chrome.storage.sync.get({ btnStatus: true }, function(items) {
    var btnStatus = items.btnStatus;
    if(!!btnStatus) {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
    } else {
      chrome.browserAction.setBadgeText({text: 'OFF'});
      chrome.browserAction.setBadgeBackgroundColor({color: '#bbb'});
    }
  });
}
queryStatus();
chrome.contextMenus.create({
  title: "测试右键菜单",
  onclick: function(){alert('您点击了右键菜单！');}
});
// chrome.runtime.onInstalled.addListener(function(){
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
//       chrome.declarativeContent.onPageChanged.addRules([
//           {
//               conditions: [
//                   // 只有打开百度才显示pageAction
//                   new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
//               ],
//               actions: [new chrome.declarativeContent.ShowPageAction()]
//           }
//       ]);
//   });
// });
// 监听来自content-script的消息
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
// {
//     _context.localStorage = request.localStorage || {};
//     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
//     // return true;
// });

