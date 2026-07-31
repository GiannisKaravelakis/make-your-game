//Tracks crosshair movement

//Centering crosshair to the container
let crosshairX = 400;
let crosshairY = 300;

//Speed and size of the crosshair
const crosshairSpeed = 0.4;
const crosshairSize = 40;

const crosshairEl = document.getElementById('crosshair');

function updateCrosshair(deltaTime) {
    if (keys['ArrowLeft'])  crosshairX -= crosshairSpeed * deltaTime;
    if (keys['ArrowRight']) crosshairX += crosshairSpeed * deltaTime;
    if (keys['ArrowUp'])    crosshairY -= crosshairSpeed * deltaTime;
    if (keys['ArrowDown'])  crosshairY += crosshairSpeed * deltaTime;

    //Stop the crosshair of going out of borders of the container
    crosshairX = Math.max(0, Math.min(crosshairX, containerWidth - crosshairSize));
    crosshairY = Math.max(0, Math.min(crosshairY, containerHeight - crosshairSize));
}

function renderCrosshair() {
    crosshairEl.style.transform = `translate(${crosshairX}px, ${crosshairY}px)`;
}