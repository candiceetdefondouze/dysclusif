const resetDialog = document.getElementById("reset-statistics");
const advancedDialog = document.getElementById("advanced-settings");


let resetStatistics = () => {
    browser.storage.local.set({ statistics: {
        "totalReplaced": 0,
        "documentsModified": 0
    }}).then(() => {
        loadStatistics();
    });
};

let toggleEnabled = () => {
    browser.storage.local.get(["settings"]).then(result => {
        let settings = result.settings;
        
        settings.enabled = !settings.enabled;
        browser.storage.local.set({ settings: settings}).then(() => {
            loadStatus();
        })
    })
};

let updateAdvancedSettings = () => {
    browser.storage.local.get(["settings"]).then(result => {
        let settings = result.settings;

        settings.replaceAllSpans = document.getElementById("replaceAllSpans").checked;
        settings.hideBadge = document.getElementById("hideBadge").checked;

        if (settings.hideBadge)
            browser.runtime.sendMessage({ type: "hideBadge" });

        browser.storage.local.set({ settings: settings}).then(() => {
            loadStatus();
        })
    })
};

let loadStatus = () => {
    browser.storage.local.get(["settings"]).then(result => {
        let settings = result.settings;

        if (settings.enabled) {
            document.getElementById("status").classList = ["enabled"];
        } else {
            document.getElementById("status").classList = [];
            browser.runtime.sendMessage({ type: "hideBadge" });
        }
        document.getElementById("replaceAllSpans").checked = settings.replaceAllSpans;
        document.getElementById("hideBadge").checked = settings.hideBadge;
    })
};

let loadStatistics = () => {
    browser.storage.local.get(["statistics"]).then(result => {
        let statistics = result.statistics;
      
        document.getElementById("count-replaced").textContent = statistics["totalReplaced"];
        document.getElementById("count-modified").textContent = statistics["documentsModified"];
    })
};

let closeDialog = () => {
    document.location = "#!";
}

document.getElementById("status-img").onclick = toggleEnabled;

const confirmReset = document.getElementById("reset-confirm");
confirmReset.addEventListener('click', () => {
    resetStatistics();
    closeDialog();
});


const updateAdvanced = document.getElementById("advanced-confirm");
updateAdvanced.addEventListener('click', () => {
    updateAdvancedSettings();
    closeDialog();
});


loadStatus();
loadStatistics();