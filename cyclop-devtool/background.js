const connections = {};
const dataMap = {}
let isFirstInit = true;

const NEW_SUBSCRIPTION_ACTION = 'didGetNewSubscription';
const FIRST_SUBSCRIPTION_ACTION = 'didGetFirstSubscriptions';

/*
 * Snow White -> content-script.js -> **background.js** -> dev tools
 */
chrome.runtime.onMessage.addListener((event, sender) => {
  console.log(event)
    if (event.name === '888') {
      
      dataMap[event.order] = event;
      const tabId = sender.tab.id;

      if (!!connections[tabId]) {

        if (!isFirstInit) {
          const message = {
            name: NEW_SUBSCRIPTION_ACTION,
            data: event
          }
          connections[tabId].postMessage(message);
        } else {
          const message = {
            name: FIRST_SUBSCRIPTION_ACTION,
            data: dataMap
          }
          connections[tabId].postMessage(message);
          isFirstInit = false;
          dataMap = null;
        }
      }
    }
});

/*
 * Snow White <- content-script.js <- **background.js** <- dev tools
 */
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((req) => {
    if (req.name === 'init') {
      connections[req.tabId] = port;
    }
  });
});
