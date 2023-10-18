// function onUpdated(tab) {
  // console.log(`Updated tab: ${tab.id}`);
// }

// function onError(error) {
  // console.log(`Error: ${error}`);
// }
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log("url change listener")
    // if (changeInfo.url) {
        // const url = new URL(changeInfo.url);
        // const searchParams = url.searchParams;

        // const paramsToAdd = []
        // for (const [key, value] of Object.entries(localStorage)) {
            // if(!searchParams[key]) {
                // paramsToAdd.push(key);
            // }
        // }

        // console.log("paramsToAdd", paramsToAdd);

        // if(paramsToAdd.length > 0) {
            // for (const key of paramsToAdd) {
                // url.searchParams.set(key, localStorage.getItem(key))
            // }

            // chrome.tabs.update(tabId, {
                // url: url.toString()
            // }).then(onUpdated, onError);

        // }
    // }
// });

console.log('Service worker started.');
