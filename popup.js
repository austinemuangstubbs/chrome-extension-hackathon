// document.addEventListener('DOMContentLoaded', () => {
    
    console.log('This is a popup!');
    console.log('This is another popup!');
    const textSummary = document.querySelector("#summaryText")
    
    

    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
          
              console.log(message.summary);

              textSummary.innerHTML = message.summary;
    });

    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //     // 2. A page requested user data, respond with a copy of `user`
    //     if (message === 'get-user-data') {
    //       sendResponse(user);
    //     }
    //   });
    
    // grab the current summary text div
    // change its contents to the value of "textSummary"
    
    // });
    
    
    // chrome.scripting
    //     .executeScript({
    //       target : {tabId : getTabId()},
    //       files : [ "background.js" ],
    //     })
    //     .then(() => console.log("injected background.js script file"));