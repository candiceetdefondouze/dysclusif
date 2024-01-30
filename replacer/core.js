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
    [`x${optPt}(ses|se|s)(?![a-zA-Z])`, "x"], // nombreux•ses
    [`eur(s|)${pt}(ses|se)(?![a-zA-Z])`, "eurs"], // chercheur•ses
    [`l${pt}les(?![a-zA-Z])`, "ls"], // personnel•les
    [`l${pt}le(?![a-zA-Z])`, "l"], // personnel•le
    [`(${pt}e|\\(e\\))(?![a-zA-Z])`, ""], // •e / (e)

    // With explicit parenthesis
    [`\\((trice|e|ne|ice)\\)s(?![a-zA-Z])`, "s"], // instituteur(trice)s
    [`\\((trice|e|ne|ice)\\)(?![a-zA-Z])`, ""] // instituteur(trice)
];

let regexps = [];
for (let i=0; i < expressions.length; i++) {
    let regex = new RegExp(expressions[i][0], "g");
    regexps.push(regex);
}


let applyRegExps = (text) => {
    let textReplacementsCount = 0;

    for (let i = 0; i < expressions.length; i++) {
        const regex = regexps[i];
        const replacement = expressions[i][1];

        const matches = text.match(regex) || [];
        textReplacementsCount += matches.length;

        text = text.replace(regex, replacement);
    }
    return [text, textReplacementsCount];
}


module.exports = {
    applyRegExps: applyRegExps
};