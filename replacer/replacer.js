let pt = '(•|\\.|·|⋅|⸱|\\-)';
let optPt = `(${pt}|)`;

expressions = [
    // Complete words
    [`(?<![a-zA-Z])tous${optPt}te${optPt}s|tou${pt}te${optPt}s(?![a-zA-Z])`, "tous"],
    [`(?<![a-zA-Z])iels(?![a-zA-Z])`, "ils"],
    [`(?<![a-zA-Z])iel(?![a-zA-Z])`, "il"],
    [`(?<![a-zA-Z])celleux(?![a-zA-Z])`, "ceux"],
    [`(?<![a-zA-Z])lae(?![a-zA-Z])`, "le"],

    // End of words
    [`(s|)${pt}(trice|e|ne|ice)${optPt}s(?![a-zA-Z])`, "s"], // spectateurs•trice•s
    [`${pt}(trice|e|ne|ice)(?![a-zA-Z])`, ""], // ancien•ne
    [`eur${pt}(ice|euse)${optPt}s(?![a-zA-Z])`, "eurs"], // travailleur•euse•s
    [`\\((trice|e|ne|ice)\\)s(?![a-zA-Z])`, "s"], // instituteur(trice)s
    [`\\((trice|e|ne|ice)\\)(?![a-zA-Z])`, ""], // instituteur(trice)
    [`((x${pt}(ses|se))|xs)(?![a-zA-Z])`, "x"], // nombreux•ses
    [`eur(s|)${pt}(ses|se)(?![a-zA-Z])`, "eurs"], // chercheur•ses
    [`l${pt}les(?![a-zA-Z])`, "ls"], // personnel•les
    [`l${pt}le(?![a-zA-Z])`, "l"], // personnel•le
    [`(${pt}e|\\(e\\))(?![a-zA-Z])`, ""]
];

let regexps = [];
for (let i=0; i < expressions.length; i++) {
    let regex = new RegExp(expressions[i][0], "g");
    regexps.push(regex);
}

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


let applyRegExps = (text) => {
    let textReplacementsCount = 0;

    for (let i = 0; i < expressions.length; i++) {
        const regex = regexps[i];
        const replacement = expressions[i][1];

        const matches = text.match(regex) || [];
        textReplacementsCount += matches.length;

        /* if (matches.length != 0) {
            console.debug("[[Dysclusif]] replacing ", matches);
        } */

        text = text.replace(regex, replacement);
    }
    return [text, textReplacementsCount];
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