const applyRegExps = require("./../replacer/core.js").applyRegExps;

let testsCases = [
    ["du.de la nouveau.elle", "du nouveau"],
    ["internationaux·les", "internationaux"],
    ["instituteur(trice)s", "instituteurs"],
    ["travailleur·euse·s", "travailleurs"],
    ["représentant·es", "représentants"],
    ["chercheurs.se.s", "chercheurs"],
    ["directeurices", "directeurs"],
    ["nouveaux·elles", "nouveaux"],
    ["adhérent·e·s", "adhérents"],
    ["nombreuxses", "nombreux"],
    ["acteur·rices", "acteurs"],
    ["tous.tes", "tous"],
    ["Tous.tes", "Tous"],
    ["celleux", "ceux"],
    ["lae", "le"],
    ["lea", "le"],

    ["Arc-en-ciel", "Arc-en-ciel"],
];

let test = (text, expected) => {
    let result = applyRegExps(text)[0];

    if (result === expected) {
        console.log(`[\x1b[32mOK\x1b[0m] ${text} -> ${result}`);
        return false;
    } else {
        console.log(`[\x1b[31mFAIL\x1b[0m] ${text} -> \x1b[31m${result}\x1b[0m (expected: ${expected})`);
        return true;
    }
}


console.log("\x1b[34m####  tests: Replacements  ####\x1b[0m");

let exitCode = 0;
for (let i = 0; i < testsCases.length; i++) {
    const testCase = testsCases[i];
    if (test(testCase[0], testCase[1])) {
        exitCode = 1;
    }
}

process.exit(exitCode);