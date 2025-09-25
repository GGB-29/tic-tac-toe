//player factory function
function createPlayer (name) {
    let playerScore = 0;
    const playerName = name;
    
    const getScore = () => (playerScore);
    const setScore = () => playerScore++;
    const getName = () => (playerName);
    
    return {getName, getScore, setScore};
}


//gameboard factory function
function createGameboard () {
    let gameboard = [ 
                      ['', '', ''], 
                      ['', '', ''], 
                      ['', '', '']
                    ];
    const addCounter = (player, xpos, ypos) => {gameboard[ypos][xpos] = player;};
    const getGameboard = () => (gameboard);
    const reset = () => {
        gameboard = [ 
                      ['', '', ''], 
                      ['', '', ''], 
                      ['', '', '']
                    ];
    };
    return {addCounter, getGameboard, reset};
};

//create game module
const gameObject = (function () {
    const gameboardObject = createGameboard();

    const playerOne = createPlayer('test1');
    const playerTwo = createPlayer('test2');
    let firstPlayer = playerOne;
    let currentPlayer = firstPlayer;
    let turnNumber = 1; //odd turns -> cross, even -> circle

    //checks if there is a winner
    const isGameWon = () => (isRowWon() || isColumnWon() || isDiagonalWon());

    const isRowWon = () => {
        const currentGameboard = gameboardObject.getGameboard();
        for (let y = 0; y < 3; y++) {
            if (currentGameboard[y][0] === currentGameboard[y][1] && 
                currentGameboard[y][1] === currentGameboard[y][2] && 
                currentGameboard[y][0] !== '') {
                return true;
            }
        }
        return false;
    };
    const isColumnWon = () => {
        const currentGameboard = gameboardObject.getGameboard();
        for (let x = 0; x < 3; x++) {
            if (currentGameboard[0][x] === currentGameboard[1][x] && 
                currentGameboard[1][x] === currentGameboard[2][x] && 
                currentGameboard[0][x] !== '') {
                return true;
            }
        }
        return false;
    };
    const isDiagonalWon = () => {
        const currentGameboard = gameboardObject.getGameboard();
        return ((currentGameboard[0][0] === currentGameboard[1][1] && currentGameboard[1][1] === currentGameboard[2][2] && currentGameboard[1][1] !== '') 
            || (currentGameboard[0][2] === currentGameboard[1][1] && currentGameboard[1][1] === currentGameboard[2][0]) && currentGameboard[1][1] !== '');
    };

    //called each time a box is clicked
    const playTurn = (xpos, ypos) => {
        gameboardObject.addCounter(currentPlayer, xpos, ypos);
        turnNumber++;
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        if (isGameWon()) {
            endGame();
        }
    };

    const startGame = () => {
        const gridSquares = document.querySelectorAll('.grid-square');
        gridSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (square.innerHTML === '') {
                    if (turnNumber % 2 === 0) {
                        square.innerHTML = '<img src="assets/purple_o.svg">';
                    } else {
                        square.innerHTML = '<img src="assets/cyan_x.svg">';
                    }
                    playTurn(Number(square.dataset.x), Number(square.dataset.y));
                }
            })
        });

        
    }

    const endGame = () => {
        console.log('test');
        //winner is player of previous turn
        let winner = (currentPlayer === playerOne) ? playerTwo : playerOne;
        currentPlayer.setScore;
        gameboardObject.reset();
        
        //change player who goes first
        firstPlayer = (firstPlayer === playerOne) ? playerTwo : playerOne;
    };

    return {startGame};
})();

gameObject.startGame();