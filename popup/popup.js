function freeze(obj) {
    const key = obj.currentTarget.paramKey
    const value = obj.currentTarget.paramValue
    chrome.storage.local.set({[key]: value}, () => {
        console.log("Set param")
        redraw()
    });
}

function unfreeze(obj) {
    const key = obj.currentTarget.paramKey
    const value = obj.currentTarget.paramValue
    chrome.storage.local.remove(key, () => {
        console.log("Removed param")
        redraw()
    });
}

function redraw() {
    $("#frozenTable").empty(); 
    $("#unfrozenTable").empty(); 

    chrome.storage.local.get(null, function (items) {
        const frozenParams = []

        for (const [key, value] of Object.entries(items)) {
            $('#frozenTable').append($(`<tr><td>${key}</td><td>${value}</td><td><input type="button" value="unfreeze" id="${key}=${value}" /></td></tr>`))
            const button = document.getElementById(key + "=" + value)
            button.addEventListener("click", unfreeze, false)
            button.paramKey = key
            button.paramValue = value
            frozenParams.push({"key": key, "value": value});
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const searchParams = new URL(tabs[0].url).searchParams;
            for (const [key, value] of searchParams) {
                chrome.storage.local.get(key, function(obj) {
                    if(JSON.stringify(obj) === '{}') {
                        $('#unfrozenTable').append($(`<tr><td>${key}</td><td>${value}</td><td><input type="button" value="freeze" id="${key}=${value}" /></td></tr>`))
                        const button = document.getElementById(key + "=" + value)
                        button.addEventListener("click", freeze, false)
                        button.paramKey = key
                        button.paramValue = value
                    }

                });        
            }
        });

        chrome.declarativeNetRequest.getDynamicRules(previousRules => {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1],
                addRules: [{
                    "id": 1,
                    "action": {
                        "type": "redirect",
                        "redirect": {
                            "transform": {
                                "queryTransform": {
                                    "addOrReplaceParams": frozenParams
                                }
                            }
                        }
                    },
                    "condition": {
                        "urlFilter": "*://*/*",
                        "resourceTypes" : ["main_frame"]
                    }
                }]
            });
        });
    });
}

redraw()
