//Contains functions for duck spawning, moving and rendering

const duckLayer = document.getElementById('duck-layer');
const ducks = [];

//Size and speed of ducks
const duckSize = 50;
const duckSpeed = 0.15;

//Create the duck and give it a random spawnpoint and direction
function createDuck() {
    const duck = {
        x: Math.random() * (containerWidth - duckSize),
        y: Math.random() * (containerHeight - duckSize),
        direct: Math.random() < 0.5 ? duckSpeed : -duckSpeed,
        alive: true,
        el: document.createElement('div')
    };

    duck.el.style.position = 'absolute';
    duck.el.style.width = duckSize + 'px';
    duck.el.style.height = duckSize + 'px';
    duck.el.style.backgroundColor = 'brown';
    duck.el.style.willChange = 'transform';

    duckLayer.appendChild(duck.el);
    ducks.push(duck);
}

//Update the place of ducks in the container
function updateDucks(deltaTime) {
    for (const duck of ducks) {
        if (!duck.alive) continue;

        duck.x += duck.direct * deltaTime;

        //Bounce of right/left sides
        if (duck.x <= 0 || duck.x >= containerWidth - duckSize) {
            duck.direct *= -1;
        }
    }
}

//Render the ducks in the container
function renderDucks() {
    for (const duck of ducks) {
        duck.el.style.transform = `translate(${duck.x}px, ${duck.y}px)`;
        duck.el.style.display = duck.alive ? 'block' : 'none';
    }
}