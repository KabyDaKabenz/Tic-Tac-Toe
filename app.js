// HTML Elements
const status = document.querySelector('.status')
const reset = document.querySelector('.reset')
const gamegrid = document.querySelector('.game-grid')

// Grab all grid divs
const gridDivs = document.querySelectorAll('.game-cell')

// Grab Difficulty button
const diff = document.querySelector('#diff')

// Game variables
let gameOnGoing = true
let xNextTurn = true
let winner = null
let xSymbol = '×'
let oSymbol = '○'
let playerTurn = true
let mapping = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' 
}


/* functions */

const letterToSymbol = (letter) => {
    return letter == 'x'? xSymbol : oSymbol
}

const handleWin = (letter) => {
    winner = letter
    gameOnGoing = false
    if(winner === 'x'){
        status.innerHTML = `${letterToSymbol(winner)} has won!`
    } else {
        status.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`
    }
    reset.innerHTML = 'Restart'
}

const checkGameStatus = () => {
    const one = gridDivs[0].classList[2]
    const two = gridDivs[1].classList[2]
    const three = gridDivs[2].classList[2]
    const four = gridDivs[3].classList[2]
    const five = gridDivs[4].classList[2]
    const six = gridDivs[5].classList[2]
    const seven = gridDivs[6].classList[2]
    const eight = gridDivs[7].classList[2]
    const nine = gridDivs[8].classList[2]

    //Horizontal
    if(one && one === two && one === three){
        handleWin(one)
    } else if(four && four === five && four === six) {
        handleWin(four)
    } else if(seven && seven == eight && eight == nine){
        handleWin(seven)
    } 
    //Vertical
    else if(one && one === four && one === seven) {
        handleWin(one)
    } else if(two && two === five && two === eight) {
        handleWin(two)
    } else if(three && three === six && three === nine) {
        handleWin(three)
    } 
    //Diagonal
    else if(one && one === five && one === nine) {
        handleWin(one)
    } else if(three && three === five && three === seven) {
        handleWin(three)
    } else if (one && two && three && four && five && six && seven && eight && nine) {
        // Game is a tie
        gameOnGoing = false
        status.innerHTML = 'It is a tie!'
        reset.innerHTML = 'Restart'
    } else {
        xNextTurn = !xNextTurn
        if(xNextTurn){
            status.innerHTML = `${xSymbol} is next`
        } else {
            status.innerHTML = `<span>${oSymbol} is next</span>`
        }
    }

    playerTurn = !playerTurn
    
}

const emptySpot = (classlist) => {
    return !classlist.contains('x') && !classlist.contains('o')
}

// Event handlers

const handleReset = (e) => { 
   xNextTurn = true
   status.innerHTML = `${xSymbol} is next`
   for (const gridDiv of gridDivs) {
       gridDiv.classList.remove('x')
       gridDiv.classList.remove('o')
       gridDiv.style.cursor = 'pointer'
    }   
    winner = null
    gameOnGoing = true
    reset.innerHTML = 'Reset'
    playerTurn = true
}

const handleCellClick = (e) => {
    const classList = e.target.classList
    const difficulty = diff.options[diff.selectedIndex].value
    //If position is not occupied, allow user to place letter.

    switch(difficulty) {
        case 'easy':
            if(gameOnGoing && emptySpot(classList) && playerTurn) {
                classList.add('x')
            }
            checkGameStatus()
            if(gameOnGoing && !playerTurn) {
                setTimeout(() => {
                    computerEasyModeMove()
                    checkGameStatus()
                }, 500)
            }
            break
        case 'medium':
            console.log('medium')
            break
        case 'friend':
            if(gameOnGoing && emptySpot(classList)) {
                if(xNextTurn){
                        classList.add('x')
                } else {
                        classList.add('o')
                }
                e.target.style.cursor = 'default'
                checkGameStatus()
            }
            break
        default:
            return
    }
}

/* Event Listeners */

// Reset game when 'reset' button is clicked.
reset.addEventListener('click', handleReset)

// Placing event listeners to every button on the grid.
for (const gridDiv of gridDivs) {
    gridDiv.addEventListener('click', handleCellClick)
}

diff.addEventListener('change', handleReset)

// play computer's turn on easy mode.
function computerEasyModeMove() {
    let randomeMove = () => Math.floor(Math.random() * 9) + 1
    let computerMove = randomeMove()

    while(document.querySelector(`.${mapping[computerMove]}`).classList.contains('o')
             || document.querySelector(`.${mapping[computerMove]}`).classList.contains('x')){
        computerMove = randomeMove()
    }
    document.querySelector(`.${mapping[computerMove]}`).classList.add('o')
    document.querySelector(`.${mapping[computerMove]}`).style.cursor = 'default'
}
