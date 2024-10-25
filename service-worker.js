

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


//* Listen for message sent from the browser with the wikipedia page (content.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)

    const fullWikiArticleText = message.fullWikiArticleText
    const wikiURL = message.wikiURL



    // Define the endpoint URL
    const url = 'https://api.openai.com/v1/chat/completions';

    // Define the data you want to send in the request body
    const data = {
        model: "gpt-4o-mini",
        messages: [{"role": "system", "content": "You are a summarization system. You specialize in summarizing content into 2 sentences."}, {"role": "user", "content": `Please summarize the following content. Don't provide anything else, just the summarized content. Summarize in 2 sentences:     ${fullWikiArticleText}`}],
        max_tokens: 120,
        temperature: 0.01,
        frequency_penalty: 0
    }

    // Make the POST request
    fetch(url, {
        method: 'POST', // Specify the request method
        headers: {
        'Content-Type': 'application/json', // Set the request headers
        'Authorization': `Bearer OPEN_AI_API_KEY` // Add other headers if needed
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string for the body
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        const summary = data.choices[0].message.content
        console.log("summary", summary)

        const messageObject = {
            wikiURL: message.wikiURL,
            summary: summary
        }


        chrome.runtime.sendMessage(messageObject, (response) => {
            // 3. Got an asynchronous response with the data from the service worker
        
        
            
            // console.log('received user data', response);
            // initializeUI(response);
        });
        


    })
    .catch(error => {
        console.error('Error:', error);
    });



    sendResponse("recieveduser");
    // 2. A page requested user data, respond with a copy of `user`
  });



// async function getCurrentTab() {
//     console.log("getCurrentTab run")
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     console.log(tab)
//     return tab;
// }

// async function getTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let tabs = await chrome.tabs.query(queryOptions);
//     console.log("tabs[0].url", tabs[0].url)
//     return tabs[0].url;
// }
// getTab()
// getCurrentTab()

chrome.scripting
  .registerContentScripts([{
    id: "session-script",
    js: ["content.js"],
    persistAcrossSessions: false,
    matches: ["*://wikipedia.org/*"],
    runAt: "document_start",
  }])
  .then(() => {
    console.log("registration complete")


  })
  .catch((err) => console.warn("unexpected error", err))


  //   const summaryContent = document.querySelector("#summaryText").innerText
//   summaryContent = "Thing"