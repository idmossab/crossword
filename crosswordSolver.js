// Initialize the solution array to hold all the valid solutions
let solutions = [];
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

        for (let k = i + 1; k < word.length; k++) {
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

// Clone a 2D array
function cloneMatrix(matrix) {
    return matrix.map(row => [...row]);
}

// Check if the solution is complete (no more numbers)
function isComplete(matrix) {
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (['0', '1', '2'].includes(matrix[r][c])) {
                return false;
            }
        }
    }
    return true;
}

// Try to place a word horizontally
function placeHorizontal(matrix, word, r, c) {
    const newMatrix = cloneMatrix(matrix);

    // Check if word fits horizontally
    if (c + word.length > matrix[r].length) {
        return null;
    }

    // Check if there's space right after the word
    if (c + word.length < matrix[r].length && matrix[r][c + word.length] !== '.') {
        return null;
    }

    // Check if there's space right before the word (for marker 1)
    if (matrix[r][c] === '1' && c > 0 && matrix[r][c - 1] !== '.') {
        return null;
    }

    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[r][c + i];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null; // Can't place if conflicting letter
        }
        newMatrix[r][c + i] = word[i];
    }

    return newMatrix;
}

// Try to place a word vertically
function placeVertical(matrix, word, r, c) {
    const newMatrix = cloneMatrix(matrix);

    // Check if word fits vertically
    if (r + word.length > matrix.length) {
        return null;
    }

    // Check if there's space right after the word
    if (r + word.length < matrix.length && matrix[r + word.length][c] !== '.') {
        return null;
    }

    // Check if there's space right before the word (for marker 1)
    if (matrix[r][c] === '1' && r > 0 && matrix[r - 1][c] !== '.') {
        return null;
    }

    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[r + i][c];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null; // Can't place if conflicting letter
        }
        newMatrix[r + i][c] = word[i];
    }

    return newMatrix;
}

// Recursive solving function
function solveCrossword(puzzle, current, words, index) {
    // If we've placed all words, check if the solution is complete
    if (index === words.length) {
        if (isComplete(current)) {
            solutions.push(current);
        }
        return;
    }

    // Get the current word
    const word = words[index];

    // Try placing at every possible position
    for (let r = 0; r < puzzle.length; r++) {
        for (let c = 0; c < puzzle[r].length; c++) {
            // Only try positions marked with 1 or 2
            if (puzzle[r][c] !== '1' && puzzle[r][c] !== '2') {
                continue;
            }

            // Try horizontal placement
            const horizontal = placeHorizontal(current, word, r, c);
            if (horizontal) {
                solveCrossword(puzzle, horizontal, words, index + 1);
            }

            // Try vertical placement
            const vertical = placeVertical(current, word, r, c);
            if (vertical) {
                solveCrossword(puzzle, vertical, words, index + 1);
            }
        }
    }
}

function CheckPalces(puzzel, words) {
    let puzz = [];
    let pu = puzzel.split("\n");
    pu.forEach(line => {
        puzz.push([...line]);
    });

    // Reset solutions array
    solutions = [];

    // Start the recursive solving
    solveCrossword(puzz, cloneMatrix(puzz), words, 0);

    // Check if there's exactly one solution
    if (solutions.length !== 1) {
        return null;
    }

    return solutions[0];
}

function crosswordSolver(puzzleMap, words) {
    if (CheckWords(words) || CheckPuzzel(puzzleMap) || CheckWordInPuzzel(puzzleMap, words)) {
        return console.log("Error");
    }

    let solution = CheckPalces(puzzleMap, words);

    if (solution === null) {
        console.log("Error");
    } else {
        // Print the solution
        console.log(solution.map(row => row.join('')).join('\n'));
    }
}

// Test case
const puzzle = `2001
0..0
1000
0..0`
const words = ["casa", 'alan', 'ciao', "anta"]
crosswordSolver(puzzle, words);

/* output:
casa
i..l
anta
*/



function CheckWordInPuzzel1(puzzel, words) {
    let wordlen = words.join("").length;
    let puzz = puzzel.replace(/\n/g, "").replace(/\./g, "");

    let c = puzz.split("").reduce((sum, char) => sum + parseInt(char) + 1, 0);
    return c !== wordlen;
}
console.log(CheckWordInPuzzel1(puzzle, words))