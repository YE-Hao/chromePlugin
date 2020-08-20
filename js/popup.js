
function setStatus(status) {
  // 保存数据
  chrome.storage.sync.set({btnStatus: status}, function() {
    console.log('保存成功！');
  });
}
function showData(context = {}) {
  var target = document.querySelector('#item-ul');
  target.innerHTML = '';
  // var bg = chrome.extension.getBackgroundPage();
  // console.log(bg);
  // var context = bg.provideData();
  var values = context.localStorage || {}
  var keys = Object.keys(values);
  var lli = '';
  for(var key of keys) {
    lli += `<li><span class='local-key'>${key}</span><span class='local-value'>${values[key]}</span></li>`;
  }
  
  target.insertAdjacentHTML('beforeend', lli);
}
(function(){
    var status_btn;
    var btn = document.querySelector('#action-btn');
    btn.onclick = function() {
    chrome.storage.sync.get({ btnStatus: true }, function(items) {
      status_btn = items.btnStatus;
      if (!status_btn) {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
        btn.textContent = '关闭';
        setStatus(true);
      } else {
        chrome.browserAction.setBadgeText({text: 'OFF'});
        chrome.browserAction.setBadgeBackgroundColor({color: '#bbb'});
        btn.textContent = '开启';
        setStatus(false);
      }
    });
  }
    chrome.storage.sync.get({ btnStatus: true }, function(items) {
      status_btn = items.btnStatus;
      if (!status_btn) {
        btn.textContent = '开启';
      } else {
        btn.textContent = '关闭';
      }
    });
    sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
    {
      console.log('来自content的回复：'+response);
      if (status_btn) {
        // 显示数据
        showData(response);
      }
    });
})()
function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
      chrome.tabs.sendMessage(tabs[0].id, message, function(response)
      {
          if(callback) callback(response);
      });
    });
}