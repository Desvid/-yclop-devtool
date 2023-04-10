window.postMessage("content-init", '*');
/*
 * Snow White -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', (message) => {
  if (message.data.name === '888') {
    chrome.runtime.sendMessage(message.data);
  }
});

/*
 * Snow White <- **content-script.js** <- background.js <- dev tools
 */
chrome.runtime.onMessage.addListener((request) => {
  window.postMessage(request, '*');
});
