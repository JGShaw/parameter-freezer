function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        const searchParams = url.searchParams;

        chrome.storage.local.get(null, function (items) {
            redirect = false

            for (const [key, value] of Object.entries(items)) {
                if(!searchParams[key]) {
                    console.log("Adding", key, value)
                    url.searchParams.set(key, value);
                    redirect = true
                }
            }
            if(redirect) {
                chrome.tabs.update(tabId, { url: url.toString() }).then(onUpdated, onError);
            }
        });
    }
});

console.log('Service worker started.');
