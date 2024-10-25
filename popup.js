// // document.addEventListener('DOMContentLoaded', () => {
    
// console.log('This is a popup!');
// console.log('This is another popup!');
// const textSummary = document.querySelector(".mw-content-ltr mw-parser-output")
// const windowLocation  = window.location
// console.log ("textSummary: ", textSummary)
// console.log("windowLocation: ", windowLocation)
// // grab the current summary text div
// // change its contents to the value of "textSummary"

// // });

// document.getElementById("test").addEventListener('click', () => {
//   console.log("Popup DOM fully loaded and parsed");

//   function modifyDOM() {
//       //You can play with your DOM here or check URL against your regex
//       console.log('Tab script:');
//       console.log(document.body);
//       return document.body.innerHTML;
//   }

//   //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//   chrome.tabs.executeScript({
//       code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
//   }, (results) => {
//       //Here we have just the innerHTML and not DOM structure
//       console.log('Popup script:')
//       console.log(results[0]);
//   });
// });


// chrome.scripting
//     .executeScript({
//       target : {tabId : getTabId()},
//       files : [ "background.js" ],
//     })
//     .then(() => console.log("injected background.js script file"));


document.getElementById("changeColor").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => { document.body.style.backgroundColor = "lightgreen"; }
    });
  });
});