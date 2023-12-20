let pt = '(•|\\.|·|⋅|\\-)';
let optPt = '(|•|\\.|·|⋅|\\-)';

expressions = [
    // Complete words
    [`(?<![a-zA-Z])tous${optPt}te${optPt}s|tou${pt}te${optPt}s(?![a-zA-Z])`, "tous"],
    [`(?<![a-zA-Z])iels(?![a-zA-Z])`, "ils"],
    [`(?<![a-zA-Z])iel(?![a-zA-Z])`, "il"],
    [`(?<![a-zA-Z])celleux(?![a-zA-Z])`, "ceux"],
    [`(?<![a-zA-Z])lae(?![a-zA-Z])`, "le"],

    // End of words
    [`s${pt}(trice|e|ne|ice)${optPt}s(?![a-zA-Z])`, "s"], // spectateurs•trices
    [`${pt}(trice|e|ne|ice)${optPt}s(?![a-zA-Z])`, "s"], // spectateur•trice•s
    [`${pt}(trice|e|ne|ice)(?![a-zA-Z])`, ""], // ancien•ne
    [`eur${optPt}(ice|euse)${optPt}s(?![a-zA-Z])`, "eurs"], // travailleur•euse•s
    [`\\((trice|e|ne|ice)\\)s(?![a-zA-Z])`, "s"], // instituteur(trice)s
    [`\\((trice|e|ne|ice)\\)(?![a-zA-Z])`, ""], // instituteur(trice)
    [`((x${pt}(ses|se))|xs)(?![a-zA-Z])`, "x"], // nombreux•ses
    [`eur(s|)${pt}(ses|se)(?![a-zA-Z])`, "eurs"], // chercheur•ses
    [`l${pt}les(?![a-zA-Z])`, "ls"], // personnel•les
    [`l${pt}le(?![a-zA-Z])`, "l"], // personnel•le
    [`(${pt}e|\\(e\\))(?![a-zA-Z])`, ""]
];

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
    let originalHTML = document.body.innerHTML;
    for (let i = 0; i < expressions.length; i++) {
        const regex = new RegExp(expressions[i][0], "g");
        const replacement = expressions[i][1];

        const matches = originalHTML.match(regex) || [];
        const replacementsInIteration = matches.length;
        documentTotalReplacements += replacementsInIteration;

        if (matches.length != 0) {
            console.debug("[[Dysclusif]] replacing ", matches);
        }

        originalHTML = originalHTML.replace(regex, replacement);
    }

    document.body.innerHTML = originalHTML;
    updateStatistics(documentTotalReplacements);
}

browser.storage.local.get(["settings"]).then(result => {
    if (result.settings.enabled) {
        replaceElems();
    }
  })