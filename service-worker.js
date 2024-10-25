// chrome.runtime.onStartup.addListener( () => {
//     console.log(`onStartup()`);
// });

console.log("service worker runs")




// function reddenPage() {
//     console.log("document")
//     document.body.style.backgroundColor = 'red';
//   }
  
//   chrome.action.onClicked.addListener((tab) => {
//     console.log("inside event listener")
//     if (!tab.url.includes('chrome://')) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: reddenPage
//       });
//     }
//   });


async function getCurrentTab() {
    console.log("getCurrentTab run")
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab)
    return tab;
}

getCurrentTab()