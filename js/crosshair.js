//Tracks crosshair movement

//Centering crosshair to the container
let crosshairX = 400;
let crosshairY = 300;

//Speed and size of the crosshair
const crosshairSpeed = 0.4;
const crosshairSize = 40;

const crosshairEl = document.getElementById('crosshair');

function updateCrosshair(deltaTime) {
    let dx = 0;
    let dy = 0;

    if (keys['ArrowLeft'])  dx -= 1;
    if (keys['ArrowRight']) dx += 1; 
    if (keys['ArrowUp'])    dy -= 1;
    if (keys['ArrowDown'])  dy += 1;

    //If diagonal movement, normalize it
    if (dx !== 0 && dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
    }

    crosshairX += dx * crosshairSpeed * deltaTime;
    crosshairY += dy * crosshairSpeed * deltaTime;

    //Stop the crosshair of going out of borders of the container
    crosshairX = Math.max(0, Math.min(crosshairX, containerWidth - crosshairSize));
    crosshairY = Math.max(0, Math.min(crosshairY, containerHeight - crosshairSize));
}

function renderCrosshair() {
    crosshairEl.style.transform = `translate(${crosshairX}px, ${crosshairY}px)`;
}