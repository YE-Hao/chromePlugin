
// 监听消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
// code...
  console.log(sender)
 sendResponse({ localStorage: localStorage });//做出回应
//  return true;
});
