let updateStatistics = (documentTotalReplacements) => {
    if (documentTotalReplacements > 0) {
        browser.storage.local.get(["statistics"]).then(result => {
            let statistics = result.statistics;
        
            browser.storage.local.set({ statistics: {
                "totalReplaced": statistics["totalReplaced"] + documentTotalReplacements,
                "documentsModified": statistics["documentsModified"] + 1
            }});
        })
    }
}


let replaceElems = () => {
    let documentTotalReplacements = 0;

    var textNodes = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);

    // iterate through all text nodes
    while (textNodes.nextNode()) {
        currentNode = textNodes.currentNode;

        let result = applyRegExps(currentNode.textContent);

        documentTotalReplacements += result[1];
        currentNode.textContent = result[0];
    }

    updateStatistics(documentTotalReplacements);
}

browser.storage.local.get(["settings"]).then(result => {
    if (result.settings.enabled) {
        replaceElems();
    }
})