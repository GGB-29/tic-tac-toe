//Create gameboard object
const gameboardObject = (function () {
    let gameboard = [ '', '', '', 
                      '', '', '',
                      '', '', ''
                    ];
    const addCounter = (player, index) => {gameboard[index] = player;};
    const getGameboard = () => (gameboard);
    return {addCounter, getGameboard};
})();

