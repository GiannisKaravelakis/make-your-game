let lastTime = 0;
let crosshairX = 400;
let crosshairY = 300;

const containerWidth = 800;
const containerHeight = 600;
const crosshairSize = 40;

const crosshairEl = document.getElementById('crosshair');


function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime  = currentTime;

    updateGame(deltaTime);
    renderGame();

    requestAnimationFrame(gameLoop);
}

function updateGame(deltaTime) {
    const speed = 0.8;

    if (keys['ArrowLeft'])  crosshairX -= speed * deltaTime;
    if (keys['ArrowRight']) crosshairX += speed * deltaTime;
    if (keys['ArrowUp'])    crosshairY -= speed * deltaTime;
    if (keys['ArrowDown'])  crosshairY += speed * deltaTime;
    
    crosshairX = Math.max(0, Math.min(crosshairX, containerWidth - crosshairSize));
    crosshairY = Math.max(0, Math.min(crosshairY, containerHeight - crosshairSize));
}

function renderGame() {
    crosshairEl.style.transform = `translate(${crosshairX}px, ${crosshairY}px)`;
}

requestAnimationFrame(gameLoop);

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
})

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
})