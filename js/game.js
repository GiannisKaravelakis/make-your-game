let lastTime = 0;

const containerWidth = 800;
const containerHeight = 600;

//Create some ducks
for (let i = 0; i < 3; i++) {
    createDuck();
}

function updateGame(deltaTime) {
    updateCrosshair(deltaTime);
    updateDucks(deltaTime);
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