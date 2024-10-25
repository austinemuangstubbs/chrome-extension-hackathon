// document.addEventListener('DOMContentLoaded', () => {
    
    console.log('This is a popup!');
    console.log('This is another popup!');
    const textSummary = document.querySelector("#summaryText")
    
    

    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {


        if(message.serviceWorkertoPopup===true){
            console.log("incoming message on popup: ", message)
            console.log(message.summary);

            textSummary.innerHTML = message.summary;
        }
           
    });



    const contentMessageKey = {
        key: "content",
        value: "1234"
    }

    chrome.runtime.sendMessage(contentMessageKey, (response) => {
        console.log("sending messagekey to messagebus from popup", contentMessageKey)
        // 3. Got an asynchronous response with the data from the service worker
    
    
        
        // console.log('received user data', response);
        // initializeUI(response);
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