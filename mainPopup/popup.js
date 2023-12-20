let resetStatistics = () => {
    let result = window.confirm("Do you really want to reset statistics ?");
    if (result) {
        browser.storage.local.set({ statistics: {
            "totalReplaced": 0,
            "documentsModified": 0
        }}).then(() => {
            loadStatistics();
        })
    }
}

let toggleEnabled = () => {
    browser.storage.local.get(["settings"]).then(result => {
        let settings = result.settings;
        
        settings.enabled = !settings.enabled;
        browser.storage.local.set({ settings: settings}).then(() => {
            loadStatus();
        })
    })
}

let loadStatus = () => {
    browser.storage.local.get(["settings"]).then(result => {
        let settings = result.settings;

        if (settings.enabled) {
            document.getElementById("status").classList = ["enabled"];
        } else {
            document.getElementById("status").classList = [];
        }
    })
}

let loadStatistics = () => {
    browser.storage.local.get(["statistics"]).then(result => {
        let statistics = result.statistics;
      
        document.getElementById("count-replaced").innerHTML = statistics["totalReplaced"];
        document.getElementById("count-modified").innerHTML = statistics["documentsModified"];
    })
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => { resetStatistics(); })
document.getElementById("status-img").onclick = toggleEnabled;

loadStatus();
loadStatistics();