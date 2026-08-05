//Handling of the different states/screens of the game

let gameState = 'MENU';

const screens = {
    MENU: document.getElementById('main-menu'),
    PLAYING: document.getElementById('game-container'),
    PAUSED: document.getElementById('pause-screen')
};

function setState(newState) {
    //Remove the previous state from being active and visible
    screens[gameState].classList.remove('active');
    gameState = newState;
    //Set new state as active and visible
    screens[gameState].classList.add('active');
}