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
    const isGameWon = () => {

    };

    //called each time a box is clicked
    const playTurn = (xpos, ypos) => {
        gameboardObject.addCounter(currentPlayer, xpos, ypos);
        isGameWon();
        turnNumber++;
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    }

    const playGame = () => {
        while (!isGameWon)  {
            continue;
        }
        let winner = currentPlayer;
        currentPlayer.setScore;
        gameboardObject.reset();
        
        //change player who goes first
        firstPlayer = (firstPlayer === playerOne) ? playerTwo : playerOne;
    }
})();

gameObject.playGame()
