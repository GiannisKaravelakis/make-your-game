let lastTime = 0;
let score = 0;
let spaceWasPressed = false;

const containerWidth = 800;
const containerHeight = 600;

//Create some ducks
for (let i = 0; i < 3; i++) {
    createDuck();
}

function shoot() {
    for (const duck of ducks) {
        if (duck.alive && checkHit(duck)) {
            duck.alive = false;
            score++;
            console.log('Score: ', score); //placeholder score tracker
        }
    }
}

function updateGame(deltaTime) {
    updateCrosshair(deltaTime);
    updateDucks(deltaTime);

    //Check if space was pressed on this frame
    if (keys['Space'] && !spaceWasPressed) {
        shoot();
    }
    spaceWasPressed = keys['Space'];
}

function renderGame() {
    renderCrosshair();
    renderDucks();
}

function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime  = currentTime;

    //A single frame can simulate at most 50ms of movement
    //to prevent a huge gap in time from when tab is inactive
    deltaTime = Math.min(deltaTime, 50);

    updateGame(deltaTime);
    renderGame();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);