console.log("service worker runs")





//* Listen for message sent from the browser with the wikipedia page (content.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("incoming message to serviceworker", message)
    if(message.key === "content"){
        // this means something should be going to content
        console.log("message key is content")
        // send to content.jschrome.tabs.query({}, (tabs) => {
        const data = {
            key:"fromServiceWorker",
            value:2345
        }
        chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            if (tab.id && tab.id !== sender.tab?.id) {
              chrome.tabs.sendMessage(tab.id, { data  });
            }
            });
        })
    }
    

    if(message.fromContentToServiceWorker === true){
        // if content send wikipedia article, then run openai summarization logic


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
            'Authorization': `Bearer Open_AI_API_KEY` // Add other headers if needed
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string for the body
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            const summary = data.choices[0].message.content
            console.log("summary", summary)

            const messageObject = {
                serviceWorkertoPopup : true,
                wikiURL: message.wikiURL,
                summary: summary
            }


            chrome.runtime.sendMessage(messageObject, (response) => {
                // 3. Got an asynchronous response with the data from the service worker
            });
            


        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    



    sendResponse("recieveduser");
});




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

