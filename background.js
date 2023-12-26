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
  if (!"enabled" in settings) {
    settings.enabled = true;
    modif = true
  }

  if (modif) {
    browser.storage.local.set({ settings: settings});
  }
})


browser.messageDisplayScripts.register({
    js: [
        { file: "replacer/replacer.js" },
    ],
});