//Handling of the different states/screens of the game

let gameState = 'MENU';

const screens = {
    MENU: document.getElementById('main-menu'),
    PLAYING: document.getElementById('duck-layer'),
    PAUSED: document.getElementById('pause-screen'),
    GAMEOVER: document.getElementById('gameover-screen'),
    HOWTOPLAY: document.getElementById('howtoplay-screen')
};

function setState(newState) {
    //Remove the previous state from being active and visible
    screens[gameState].classList.remove('active');
    gameState = newState;
    //Set new state as active and visible
    screens[gameState].classList.add('active');

    //Display crosshair when playing the game and hide when not
    crosshairEl.style.display = (gameState === 'PLAYING') ? 'block' : 'none';

    //Activate the hud when playing the game
    document.getElementById('hud').classList.toggle('active', gameState === 'PLAYING');
}