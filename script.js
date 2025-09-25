//player factory function
function createPlayer (name) {
    let playerScore = 0;
    const playerName = name;
    const playerSymbol = symbol;
    
    const getScore = () => (score);
    const setScore = () => score++;
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
    const addCounter = (player, xpos, ypos) => {gameboard[ypos, xpos] = player;};
    const getGameboard = () => (gameboard);
    const reset = () => gameboard = [ 
                                      ['', '', ''], 
                                      ['', '', ''], 
                                      ['', '', '']
                                    ];
    return {addCounter, getGameboard};
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
        for (let y = 0; y < 3; y++) {
            if (gameboardObject[y][0] === gameboardObject[y][1] && gameboardObject[y][1] === gameboardObject[y][2]) {
                return true;
            }
        }
        return false;
    };
    const isColumnWon = () => {
        for (let x = 0; x < 3; x++) {
            if (gameboardObject[0][x] === gameboardObject[1][x] && gameboardObject[1][x] === gameboardObject[2][x]) {
                return true;
            }
        }
        return false;
    };
    const isDiagonalWon = () => {
        return ((gameboardObject[0][0] === gameboardObject[1][1] && gameboardObject[1][1] === gameboardObject[2][2]) 
            || (gameboardObject[0][2] === gameboardObject[1][1] && gameboardObject[1][1] === gameboardObject[2][0]));
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

    const endGame = () => {
        //winner is player of previous turn
        let winner = (currentPlayer === playerOne) ? playerTwo : playerOne;
        currentPlayer.setScore;
        gameboardObject.reset();
        
        //change player who goes first
        firstPlayer = (firstPlayer === playerOne) ? playerTwo : playerOne;
    };
})();
