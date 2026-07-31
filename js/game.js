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
    const deltaTime = currentTime - lastTime;
    lastTime  = currentTime;

    updateGame(deltaTime);
    renderGame();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);