let pt = '(•|\\.|·|⋅|⸱|\\-)';
let optPt = `(${pt}|)`;
let notWord = `(?![a-zA-Z${pt}])`; // Not a word after

/* Regex, replacement, additional regex flags (i : case insensitive)*/
expressions = [
    // Complete words
    [`(?<![a-zA-Z])tous${optPt}te${optPt}s|tou${pt}te${optPt}s${notWord}`, "tous", "i"],
    [`(?<![a-zA-Z])iels${notWord}`, "ils", "i"],
    [`(?<![a-zA-Z])iel${notWord}`, "il", "i"],
    [`(?<![a-zA-Z])celleux${notWord}`, "ceux", "i"],
    [`(?<![a-zA-Z])(la${optPt}e|le${optPt}a)${notWord}`, "le", "i"],
    [`(?<![a-zA-Z])du.de (la${notWord}|l')`, "du", "i"],

    // End of words
    [`(s|)${pt}(trice|e|ne|ice)${optPt}s${notWord}`, "s", ""], // spectateurs•trice•s

    [`nt${pt}e${notWord}`, "nt", ""], // réprésentant.e
    [`eur${pt}se${notWord}`, "eur", ""], // serveur.se
    [`eur${optPt}ice${notWord}`, "eur", ""], // directeurice
    [`eur${pt}(r|)(ice|euse)${optPt}s${notWord}`, "eurs", ""], // travailleur•euse•s
    [`eur(s|)${pt}(se${optPt}s|se)${notWord}`, "eurs", ""], // chercheur•ses
    [`eur${optPt}ice${optPt}s${notWord}`, "eurs", ""], // directeurices
    [`nt(s|)${pt}e${optPt}s${notWord}`, "nts", ""], // représentant.e.s

    [`aux${pt}(le|elle)(s|)${notWord}`, "aux", ""], // internationaux•les
    [`au${pt}(le|elle)${notWord}`, "au", ""], // nouveau.elle
    [`x${optPt}(ses|se|s)${notWord}`, "x", ""], // nombreux•ses
    [`l${pt}les${notWord}`, "ls", ""], // personnel•les
    [`l${pt}le${notWord}`, "l", ""], // personnel•le
    
    [`${pt}(trice|e|ne|ice)${notWord}`, "", ""], // ancien•ne
    [`(${pt}e|\\(e\\))${notWord}`, "", ""], // •e / (e)

    // With explicit parenthesis
    [`\\((trice|e|ne|ice)\\)s${notWord}`, "s", ""], // instituteur(trice)s
    [`\\((trice|e|ne|ice)\\)${notWord}`, "", ""] // instituteur(trice)
];

let regexps = [];
for (let i=0; i < expressions.length; i++) {
    let regex = new RegExp(expressions[i][0], "g"+expressions[i][2]);
    regexps.push(regex);
}


let applyRegExps = (text) => {
    let textReplacementsCount = 0;

    for (let i = 0; i < expressions.length; i++) {
        const regex = regexps[i];

        // Do the replacements with a loop and check if first elem is capitalized
        const matches = text.match(regex) || [];
        textReplacementsCount += matches.length;

        for (let j=0; j < matches.length; j++) {
            let match = matches[j];

            let replacement = expressions[i][1];
            if (matches[j][0] !== match[0].toLowerCase())
                replacement = replacement[0].toUpperCase() + replacement.slice(1);

            text = text.replace(match, replacement);
        }
    }
    return [text, textReplacementsCount];
}


if (typeof module != 'undefined') {
    module.exports = {
        applyRegExps: applyRegExps
    };
}