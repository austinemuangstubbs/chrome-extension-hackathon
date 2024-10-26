

console.log("content.js runs")



const allWikiText = document.getElementsByTagName("p");

let fullWikiArticleText = ''


for(let i=0;i<allWikiText.length;i++){
    let element = allWikiText[i]
    // console.log("element", element)

    if(!element.textContent.includes("<img alt=")){
        // console.log("element.innerText",element.textContent)
        fullWikiArticleText += element.textContent
    }
    
}
console.log(fullWikiArticleText)

const wikiURL = window.location.href
console.log("wikiURL", wikiURL)


const messageObject = {
    fromContentToServiceWorker: true,
    wikiURL: wikiURL,
    fullWikiArticleText: fullWikiArticleText
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("chrome runtime onmessage listener triggered")
    console.log("recieved message: ", message)
    if (message.data.key === "fromServiceWorker") {
        console.log("content script received a message with this value:", message.value);


        chrome.runtime.sendMessage(messageObject, (response) => {
            // 3. Got an asynchronous response with the data from the service worker
        
        
        
            console.log('received user data', response);
        });
        // Perform any asynchronous operations here if necessary.
        
        // For example, if you need to return a Promise:
        return new Promise((resolve) => {
            const response = "returned from content.js";
            resolve(response);
        }).then(sendResponse);
        
        // Returning true indicates sendResponse will be called asynchronously.
        // return true;
    }

    sendResponse("returned from content.js")
    
    // return true
});
