let pt = '(•|\\.|·|⋅|⸱|\\-)';
let optPt = `(${pt}|)`;
let notWord = `(?![a-zA-Z${pt}])`; // Not a word after

expressions = [
    // Complete words
    [`(?<![a-zA-Z])tous${optPt}te${optPt}s|tou${pt}te${optPt}s${notWord}`, "tous"],
    [`(?<![a-zA-Z])iels${notWord}`, "ils"],
    [`(?<![a-zA-Z])iel${notWord}`, "il"],
    [`(?<![a-zA-Z])celleux${notWord}`, "ceux"],
    [`(?<![a-zA-Z])(lae|lea)${notWord}`, "le"],
    [`(?<![a-zA-Z])du.de (la${notWord}|l')`, "du"],

    // End of words
    [`(s|)${pt}(trice|e|ne|ice)${optPt}s${notWord}`, "s"], // spectateurs•trice•s

    [`eur${pt}(r|)(ice|euse)${optPt}s${notWord}`, "eurs"], // travailleur•euse•s
    [`eur${optPt}ice${optPt}s${notWord}`, "eurs"], // directeurices
    [`eur(s|)${pt}(se${optPt}s|se)${notWord}`, "eurs"], // chercheur•ses
    [`eur${optPt}ice${notWord}`, "eur"], // directeurice
    [`nt(s|)${pt}e${optPt}s${notWord}`, "nts"], // représentant.e.s
    [`nt${pt}e${notWord}`, "nt"], // réprésentant.e

    [`aux${pt}(le|elle)(s|)${notWord}`, "aux"], // internationaux•les
    [`au${pt}(le|elle)${notWord}`, "au"], // nouveau.elle
    [`x${optPt}(ses|se|s)${notWord}`, "x"], // nombreux•ses
    [`l${pt}les${notWord}`, "ls"], // personnel•les
    [`l${pt}le${notWord}`, "l"], // personnel•le
    
    [`${pt}(trice|e|ne|ice)${notWord}`, ""], // ancien•ne
    [`(${pt}e|\\(e\\))${notWord}`, ""], // •e / (e)

    // With explicit parenthesis
    [`\\((trice|e|ne|ice)\\)s${notWord}`, "s"], // instituteur(trice)s
    [`\\((trice|e|ne|ice)\\)${notWord}`, ""] // instituteur(trice)
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


if (typeof module != 'undefined') {
    module.exports = {
        applyRegExps: applyRegExps
    };
}