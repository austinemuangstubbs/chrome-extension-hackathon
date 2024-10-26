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
});