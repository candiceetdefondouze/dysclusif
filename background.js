const extensionVersion = browser.runtime.getManifest().version;
console.debug(`[[Dysclusif]] v${extensionVersion} loaded`);

browser.storage.local.get(["statistics"]).then(result => {
    let statistics = result.statistics;
  
    // If the variable doesn't exist, set it to a default value of 0
    if (statistics === undefined) {
      browser.storage.local.set({ statistics: {
        "totalReplaced": 0,
        "documentsModified": 0
      }});
    }
})

browser.storage.local.get(["settings"]).then(result => {
  let settings = result.settings;
  let modif = false;

  if (settings === undefined) {
    settings = {};
    modif = true;
  }
  if (!("enabled" in settings)) {
    settings.enabled = true;
    modif = true
  }
  if (!("replaceAllSpans" in settings)) {
    settings.replaceAllSpans = false;
    modif = true;
  }
  if (!("hideBadge" in settings)) {
    settings.hideBadge = false;
    modif = true;
  }

  if (modif) {
    browser.storage.local.set({ settings: settings});
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message.type == "replacementCount") {
    browser.storage.local.get(["settings"]).then(result => {
      if (!(result.settings.hideBadge))
        browser.browserAction.setBadgeText({text: message.count.toString()});
    
    });
  } else if (message.type == "hideBadge") {
    browser.browserAction.setBadgeText({text: null});
  } else {
    console.warning("[[Dysclusif]] Received unknown message", message)
  }
});


browser.messageDisplayScripts.register({
    js: [
        { file: "replacer/core.js" },
        { file: "replacer/replacer.js" }
    ],
});