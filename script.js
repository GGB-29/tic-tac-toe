//player factory function
function createPlayer (name) {
    let playerScore = 0;
    const playerName = name;
    
    const getScore = () => (score);
    const setScore = () => score++;
    const getName = () => (playerName);
    
    return {getName, getScore, setScore};
}


//gameboard factory function
function createGameboard () {
    let gameboard = [ '', '', '', 
                      '', '', '',
                      '', '', ''
                    ];
    const addCounter = (player, index) => {gameboard[index] = player;};
    const getGameboard = () => (gameboard);
    return {addCounter, getGameboard};
};

const gameObject = (function () {

})();
