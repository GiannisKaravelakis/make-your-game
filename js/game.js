let lastTime = 0;

const containerWidth = 800;
const containerHeight = 600;

function updateGame(deltaTime) {
    updateCrosshair(deltaTime);
}

function renderGame() {
    renderCrosshair();
}

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime  = currentTime;

    updateGame(deltaTime);
    renderGame();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);