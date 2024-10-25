

console.log("content.js runs")// Listen for messages
// Example: Change the background color of the page
console.log("document body style", document.body.style)
const firstHeader = document.querySelector(".mw-page-title-main")
console.log("firstHeader", firstHeader)



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
    wikiURL: wikiURL,
    fullWikiArticleText: fullWikiArticleText
}
// Log the page title to the console
console.log("Page title is:", document.title);

// 1. Send a message to the service worker requesting the user's data
chrome.runtime.sendMessage(messageObject, (response) => {
    // 3. Got an asynchronous response with the data from the service worker



    console.log('received user data', response);
    // initializeUI(response);
});