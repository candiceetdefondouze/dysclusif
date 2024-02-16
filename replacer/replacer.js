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


let replaceElems = (replaceAllSpans) => {
    let documentTotalReplacements = 0;

    // Some email clients use <span>·</span> when writing in inclusive
    // Replace all elements <span>·</span> with ·
    let spans = document.getElementsByTagName("span");
    
    for (let i = spans.length-1; i >= 0; i--) {
        let textContent = spans[i].textContent;
        if (textContent === "·" || replaceAllSpans) {
            let parentNode = spans[i].parentNode;
            parentNode.replaceChild(document.createTextNode(textContent), spans[i]);
            parentNode.normalize();
        }
    }

    // Iterate through all text nodes to find and replace
    var textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (textNodes.nextNode()) {
        currentNode = textNodes.currentNode;

        let result = applyRegExps(currentNode.textContent);

        documentTotalReplacements += result[1];
        currentNode.textContent = result[0];
    }

    updateStatistics(documentTotalReplacements);
    browser.runtime.sendMessage({
        type: "replacementCount",
        count: documentTotalReplacements
    });
}

browser.storage.local.get(["settings"]).then(result => {
    if (result.settings.enabled) {
        replaceElems(result.settings.replaceAllSpans);
    }
})