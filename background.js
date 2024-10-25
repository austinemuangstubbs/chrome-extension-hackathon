console.log("background.js")


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });
// chrome.scripting
//     .executeScript({
//       target : {tabId : getTabId()},
//       files : [ "popup.js" ],
//     })
//     .then(() => console.log("injected popup.js script file"));