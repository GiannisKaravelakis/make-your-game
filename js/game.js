let lastTime = 0;
let score = 0;
const roundDuration = 60000; //60 seconds
let timeRemaining = roundDuration;

let spaceWasPressed = false;
let escapeWasPressed = false;

const containerWidth = 800;
const containerHeight = 600;

//Player lives
const maxLives = 3;
let lives = maxLives;

//Duration of each duck wave
const waveDuration = 5000; //5 seconds
let waveTimer = waveDuration;

//Pause between waves
const betweenWaveDelay = 1000;
let pauseTimer = 0;

let waveState = 'ACTIVE';

//Reseting the game
function resetGame() {
    //Reset score and the displayed value in the screen
    score = 0;
    document.getElementById('score-display').textContent = score;    

    //Reset round timer
    timeRemaining = roundDuration;
    document.getElementById('timer-display').textContent = Math.ceil(timeRemaining / 1000);

    //Reset player lives
    lives = maxLives;
    document.getElementById('lives-display').textContent = lives;

    //Reset duck wave timer
    waveTimer = waveDuration;
    waveState = 'ACTIVE';

    //Reset position of crosshair at the center of the container
    crosshairX = containerWidth / 2;
    crosshairY = containerHeight / 2; 

    if (ducks.length === 0) {
        //Runs the first time you start the game to build the pool of ducks
        initDucks();
        spawnWave();
    } else {
        spawnWave();
    }
}

function shoot() {
    for (const duck of ducks) {
        if (duck.alive && checkHit(duck)) {
            duck.alive = false;
            duck.el.style.display = 'none';
            score++;
            //Update the displayed score
            document.getElementById('score-display').textContent = score;
            
            //Stop checking the other ducks if one is hit
            break;
        }
    }
}

function endGame() {
    document.getElementById('final-score').textContent = score;
    setState('GAMEOVER');
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

    //Decrease the time and update on screen time
    timeRemaining -= deltaTime;
    document.getElementById('timer-display').textContent = Math.ceil(timeRemaining / 1000);

    //End game when timeRemaining reaches 0
    if (timeRemaining <= 0) {
        timeRemaining = 0;
        document.getElementById('timer-display').textContent = 0;
        endGame();
    }
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

document.getElementById('btn-gameover-restart').addEventListener('click', () => {
  resetGame();
  setState('PLAYING');
});

document.getElementById('btn-gameover-mainmenu').addEventListener('click', () => {
  setState('MENU');
});

requestAnimationFrame(gameLoop);