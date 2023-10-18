function freeze(obj) {
    const key = obj.currentTarget.paramKey
    const value = obj.currentTarget.paramValue
    localStorage.setItem(key, value)
    redraw()
}

function unfreeze(obj) {
    const key = obj.currentTarget.paramKey
    const value = obj.currentTarget.paramValue
    localStorage.removeItem(key)
    redraw()
}

function redraw() {
    $("#frozenTable").empty(); 
    $("#unfrozenTable").empty(); 


    const frozenParams = [];

    for (const [key, value] of Object.entries(localStorage)) {
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
            if(!localStorage.getItem(key)) {
                $('#unfrozenTable').append($(`<tr><td>${key}</td><td>${value}</td><td><input type="button" value="freeze" id="${key}=${value}" /></td></tr>`))
                const button = document.getElementById(key + "=" + value)
                button.addEventListener("click", freeze, false)
                button.paramKey = key
                button.paramValue = value
            }
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
    }), () => { console.log("Updated rules")};
}

redraw()
