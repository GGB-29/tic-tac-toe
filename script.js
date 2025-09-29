//player factory function
function createPlayer (name) {
    let playerScore = 0;
    const playerName = name;
    
    const getScore = () => (playerScore);
    const setScore = () => playerScore++;
    const getName = () => (playerName);
    const resetScore = () => {playerScore = 0;};
    
    return {getName, getScore, setScore, resetScore};
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

    let playerOne;
    let playerTwo;
    let firstPlayer;
    let currentPlayer;

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
            || (currentGameboard[0][2] === currentGameboard[1][1] && currentGameboard[1][1] === currentGameboard[2][0] && currentGameboard[1][1] !== ''));
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

    const addGridFunctionality = () => {
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

    const startGame = () => {
        addGridFunctionality();

        const playerDetailsSubmit = document.querySelector('#submit-player-details');
        playerDetailsSubmit.addEventListener('click', (e) => {
            
            e.preventDefault();
            
            const playerDetailsBox = document.querySelector('.name-input-box');
            
            const playerOneName = document.querySelector('#player-one-name').value;
            const playerTwoName = document.querySelector('#player-two-name').value;

            playerOne = createPlayer(playerOneName);
            playerTwo = createPlayer(playerTwoName);
            firstPlayer = playerOne;
            currentPlayer = firstPlayer;

            updateNames(playerOneName, playerTwoName);
            playerDetailsBox.classList.add('hidden');
        })

        const closeBtn = document.querySelector('#winner-box');
        closeBtn.addEventListener('click', () => {
            document.querySelector('#winner-box').classList.add('hidden');
            gameboardObject.reset();
            resetDOM();
            updateScores();

            firstPlayer = (firstPlayer === playerOne) ? playerTwo : playerOne;
            currentPlayer = firstPlayer;
        });

        const resetBtn = document.querySelector('.reset');
        resetBtn.addEventListener('click', () => {
            resetDOM();
            gameboardObject.reset();
            currentPlayer = playerOne;
            firstPlayer = playerOne;
            playerOne.resetScore();
            playerTwo.resetScore();
            updateScores();
        })
        
    }

    const updateNames = (playerOneInputtedName, playerTwoInputtedName) => {
        const playerOneName = document.querySelector('.player-one-name-display');
        const playerTwoName = document.querySelector('.player-two-name-display');

        playerOneName.textContent = playerOneInputtedName;
        playerTwoName.textContent = playerTwoInputtedName;
    }

    const endGame = () => {

        //winner is player of previous turn
        let winner = (currentPlayer === playerOne) ? playerTwo : playerOne;
        winner.setScore();
        
        const winnerBox = document.querySelector('#winner-box');
        const winnerMessage = document.querySelector('#winner-message');
        winnerMessage.textContent = `${winner.getName()} wins!`.toUpperCase();
        winnerBox.classList.remove('hidden');

    };

    const resetDOM = () => {
        const gridSquares = document.querySelectorAll('.grid-square');
        gridSquares.forEach(square => {
            square.innerHTML = '';
        });
    }

    const updateScores = () => {
        const playerOneScore = document.querySelector('.player-one-score');
        const playerTwoScore = document.querySelector('.player-two-score');

        playerOneScore.textContent = 'Score: ' + playerOne.getScore();
        playerTwoScore.textContent = 'Score: ' + playerTwo.getScore();
    }

    return {startGame};
})();

gameObject.startGame();