const backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});


backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener((msg) => {
  backgroundPageConnection.postMessage({
    name: 'tick',
    tabId: chrome.devtools.inspectedWindow.tabId
  })

  console.log(msg)
});

module.exports = {};
