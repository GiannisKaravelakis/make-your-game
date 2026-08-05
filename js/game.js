let lastTime = 0;
let score = 0;
let spaceWasPressed = false;
let escapeWasPressed = false;

const containerWidth = 800;
const containerHeight = 600;

//Reseting the game
function resetGame() {
    //Reset score and the displayed value in the screen
    score = 0;
    document.getElementById('score-display').textContent = score;

    //Remove all ducks from the previous game
    for (const duck of ducks) {
        duck.el.remove();
    }
    ducks.length = 0;

    //Reset position of crosshair at the center of the container
    crosshairX = containerWidth / 2;
    crosshairY = containerHeight / 2; 

    //Recreate the ducks
    for (let i = 0; i < 3; i++) {
        createDuck();
    }
}

function shoot() {
    for (const duck of ducks) {
        if (duck.alive && checkHit(duck)) {
            duck.alive = false;
            score++;
            //Update the displayed score
            document.getElementById('score-display').textContent = score;
        }
    }
}

function updateGame(deltaTime) {
    //Check the state of the game
    if (gameState !== 'PLAYING') return;

    updateCrosshair(deltaTime);
    updateDucks(deltaTime);

    //Check if space was pressed on this frame
    if (keys['Space'] && !spaceWasPressed) {
        shoot();
    }
    spaceWasPressed = keys['Space'];
}

function renderGame() {
    //Check the state of the game
    if (gameState !== 'PLAYING') return;

    renderCrosshair();
    renderDucks();
}

function handlePauseToggle() {
    //If ESC is hit check state of game and change state accordingly
    if (keys['Escape'] && !escapeWasPressed) {
        if (gameState === 'PLAYING') setState('PAUSED');
        else if (gameState === 'PAUSED') setState('PLAYING');
    }
    escapeWasPressed = keys['Escape'];
}

function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime  = currentTime;

    //A single frame can simulate at most 50ms of movement
    //to prevent a huge gap in time from when tab is inactive
    deltaTime = Math.min(deltaTime, 50);

    handlePauseToggle();
    updateGame(deltaTime);
    renderGame();

    requestAnimationFrame(gameLoop);
}

//Buttons to change state of the game
document.getElementById('btn-start').addEventListener('click', () => {
  resetGame();
  setState('PLAYING');
});

document.getElementById('btn-resume').addEventListener('click', () => {
  setState('PLAYING');
});

document.getElementById('btn-restart').addEventListener('click', () => {
  resetGame();
  setState('PLAYING');
});

document.getElementById('btn-pause-mainmenu').addEventListener('click', () => {
  setState('MENU');
});

requestAnimationFrame(gameLoop);