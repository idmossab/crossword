//Check validate word:
function CheckWords(word) {
    const regex = /[^a-z]/g

    if (!Array.isArray(word) || word.length == 0) {
        return true
    }
    for (let i = 0; i < word.length; i++) {
        if (word[i].length < 2 || typeof word[i] != "string") {
            return true
        }

        for (let k = i + 1; k < word[i].length; k++) {
            if (word[k] == word[i]) {
                return true
            }
        }

        for (let j = 0; j < word[i].length; j++) {
            //console.log(word[i][j]);
            if (word[i][j].match(regex) != null) {
                return true
            }
        }

    }
    return false
}

//Check validate puzzl:
function CheckPuzzel(puzzl) {
    const regex = /[^0-2|.]/g
    if (typeof puzzl != "string") {
        return true
    }
    let res = puzzl.split("\n").join("")
    if (res.match(regex) != null) {
        return true
    }
    return false
}

//Check validate words in puzzel:
function CheckWordInPuzzel(puzzel, words) {
    const reg = /[\n|\.]/g
    let wordlen = words.join("").length
    let puzz = puzzel.replace(reg, reg => reg = "");
    //let c = puzz.split("").reduce((sum, char) => sum + parseInt(char) + 1, 0);
    let c = 0
    for (item of puzz) {
        c += parseInt(item) + 1;
    }
    return c !== wordlen;
}

//clone cloneGrid :
function cloneGrid(grid) {
    return grid.map(row => [...row]);
}
//result final
let solutions = [];
let foundSolution = false;
// try put word Horizontal
function placeHorizontal(puzzleGrid, word, r, c) {
    const newGrid = cloneGrid(puzzleGrid);

    // check if this word can put horizontal
    if (c + word.length > puzzleGrid[r].length) {
        return null;
    }

    // check if have place after word
    if (c + word.length < puzzleGrid[r].length && puzzleGrid[r][c + word.length] !== '.') {
        return null;
    }

    //check if have place before nbr 1
    if (puzzleGrid[r][c] === '1' && c > 0 && puzzleGrid[r][c - 1] !== '.') {
        return null;
    }

    //try put word
    for (let i = 0; i < word.length; i++) {
        const currentChar = puzzleGrid[r][c + i];
        if (currentChar === '.') {
            return null;
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null;
        }
        newGrid[r][c + i] = word[i];
    }

    return newGrid;
}

function placeVertical(puzzleGrid, word, r, c) {
    const newGrid = cloneGrid(puzzleGrid);

    if (r + word.length > puzzleGrid.length) {
        return null;
    }

    if (r + word.length < puzzleGrid.length && puzzleGrid[r + word.length][c] !== '.') {
        return null;
    }

    if (puzzleGrid[r][c] === '1' && r > 0 && puzzleGrid[r - 1][c] !== '.') {
        return null;
    }

    for (let i = 0; i < word.length; i++) {
        const currentChar = puzzleGrid[r + i][c];
        if (currentChar === '.') {
            return null;
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null;
        }
        newGrid[r + i][c] = word[i];
    }

    return newGrid;
}
//recursive
function solveCrossword(puzzleTemplate, currentGrid, words, index) {
    // if found solution:
    if (foundSolution) {
        return;
    }

    // if put all words check if that solution 
    if (index === words.length) {
        if (isComplete(currentGrid)) {
            solutions.push(currentGrid);
            foundSolution = true;
        }
        return;
    }

    // get current word
    const word = words[index];

    // try put word in place
    for (let r = 0; r < puzzleTemplate.length; r++) {
        for (let c = 0; c < puzzleTemplate[r].length; c++) {
            // try palce have 1 or 2:
            if (puzzleTemplate[r][c] !== '1' && puzzleTemplate[r][c] !== '2') {
                continue;
            }

            // try put Horizontal
            const horizontalPlacement = placeHorizontal(currentGrid, word, r, c);
            if (horizontalPlacement) {
                solveCrossword(puzzleTemplate, horizontalPlacement, words, index + 1);
                if (foundSolution) return;
            }

            // try put Vertical
            const verticalPlacement = placeVertical(currentGrid, word, r, c);
            if (verticalPlacement) {
                solveCrossword(puzzleTemplate, verticalPlacement, words, index + 1);
                if (foundSolution) return;
            }
        }
    }
}


function CheckPalces(puzzel, words) {
    let puzzleGrid = []
    let puzzleLines = puzzel.split("\n");
    puzzleLines.forEach(line => {
        puzzleGrid.push([...line])
    });
    console.log("puzell :", puzzleGrid)
    console.log("puzell-1 :", cloneGrid(puzzleGrid))
    solutions = [];
    foundSolution = false;
    //start recursive solving
    solveCrossword(puzzleGrid, cloneGrid(puzzleGrid), words, 0);
    if (solutions.length > 0) {
        return solutions[0];
    }
    return null;
}


function crosswordSolver(puzzleMap, words) {
    let error = false
    if (CheckWords(words) || CheckPuzzel(puzzleMap) || CheckWordInPuzzel(puzzleMap, words)) {
        return console.log("Error");
    }
    let solution = CheckPalces(puzzleMap, words);
    if (solution === null) {
        return console.log("Error")
    } else {
        // Print the solution
        console.log(solution.map(row => row.join('')).join('\n'));
    }
    return console.log("succ");
}


const puzzle = `2001
0..0
1000
0..0`
const words = ["casa", 'alan', 'ciao', "anta"]
crosswordSolver(puzzle, words)
console.log(CheckPalces(puzzle, words))