//Contains functions for duck spawning, moving and rendering

const duckLayer = document.getElementById('duck-layer');
const ducks = [];

//Size and speed of ducks
const duckSize = 50;
const duckSpeed = 0.15;
const maxDucks = 3;

//Create the duck
function createDuck() {
    const duck = {
        x: 0,
        y: 0,
        direct: 0,
        alive: false,
        el: document.createElement('div')
    };

    duck.el.style.position = 'absolute';
    duck.el.style.width = duckSize + 'px';
    duck.el.style.height = duckSize + 'px';
    duck.el.style.backgroundColor = 'brown';
    duck.el.style.willChange = 'transform';
    duck.el.style.display = 'none';

    duckLayer.appendChild(duck.el);
    ducks.push(duck);
    return duck;
}

//Give a duck its spawnpoint and direction
function spawnDuck(duck) {
    duck.x = Math.random() * (containerWidth - duckSize);
    duck.y = Math.random() * (containerHeight - duckSize);
    duck.direct = Math.random() < 0.5 ? duckSpeed : -duckSpeed;
    duck.alive = true;
    duck.el.style.display = 'block'; 
}

//Initialize the ducks by creating and spawning them
function initDucks() {
    for (let i = 0; i < maxDucks; i++) {
        const duck = createDuck();
        spawnDuck(duck);
    }
}

//Update the place of ducks in the container
function updateDucks(deltaTime) {
    for (const duck of ducks) {
        if (!duck.alive) continue;

        duck.x += duck.direct * deltaTime;

        //Bounce ducks of the right/left edges
        //If duck overshoots boundaries place them back at the edge
        if (duck.x <= 0) {
            duck.x = 0;
            duck.direct *= -1;
        } else if (duck.x >= containerWidth -duckSize) {
            duck.x = containerWidth - duckSize;
            duck.direct *= -1;
        }        
    }
}

//Render the ducks in the container
function renderDucks() {
    for (const duck of ducks) {
        if (duck.alive) {
            duck.el.style.transform = `translate(${duck.x}px, ${duck.y}px)`;
        }                
    }
}