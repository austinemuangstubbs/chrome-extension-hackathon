

console.log("content.js runs")// Listen for messages
// Example: Change the background color of the page
// console.log("document body style", document.body.style)
// const firstHeader = document.querySelector(".mw-page-title-main")
// console.log("firstHeader", firstHeader)



// const wikiText = document.querySelector(".mw-content-ltr mw-parser-output")
const allWikiText = document.getElementsByTagName("p");
// console.log("wiki text", allWikiText)

let fullWikiArticleText = ''


for(let i=0;i<allWikiText.length;i++){
    let element = allWikiText[i]
    // console.log("element", element)
    // grab the first 10 characters of the image content

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
// Log the page title to the console
console.log("Page title is:", document.title);

// // 1. Send a message to the service worker requesting the user's data
// chrome.runtime.sendMessage(messageObject, (response) => {
//     // 3. Got an asynchronous response with the data from the service worker



//     console.log('received user data', response);
//     // initializeUI(response);
// });


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("chrome runtime onmessage listener triggered")
    console.log("recieved message: ", message)
    if (message.data.key === "fromServiceWorker") {
        console.log("content script received a message with this value:", message.value);


        chrome.runtime.sendMessage(messageObject, (response) => {
            // 3. Got an asynchronous response with the data from the service worker
        
        
        
            console.log('received user data', response);
            // initializeUI(response);
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


// window.addEventListener("message", (event) => {

//     console.log("content window event listener triggered")
//     console.log("content window event listener event", event)
//     // if (event.source !== window || !event.data.type) return;
//     // const {type, data} = event.data;
//     // if (type === "FROM_TAB") {
//     //   chrome.runtime.sendMessage({ type: "FROM_TAB", data });
//     // }
//   });