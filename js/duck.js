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
        directX: 0,
        directY: 0,
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

    //Pick a random angle for the duck to fly
    //Chooses 0 to  360 degrees and then gets the x,y coordinates
    //with the cosine and sine functions.
    const angle = Math.random() * Math.PI * 2;
    duck.directX = Math.cos(angle) * duckSpeed;
    duck.directY = Math.sin(angle) * duckSpeed;
    
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

        duck.x += duck.directX * deltaTime;
        duck.y += duck.directY * deltaTime;

        //Bounce ducks of the right/left edges
        //If duck overshoots boundaries place them back at the edge
        if (duck.x <= 0) {
            duck.x = 0;
            duck.directX *= -1;
        } else if (duck.x >= containerWidth -duckSize) {
            duck.x = containerWidth - duckSize;
            duck.directX *= -1;
        }
        
        //Bounce ducks of the top/bottom edges
        //If duck overshoots boundaries place them back at the edge
        if (duck.y <= 0) {
            duck.y = 0;
            duck.directY *= -1;
        } else if (duck.y >= containerHeight -duckSize) {
            duck.y = containerHeight - duckSize;
            duck.directY *= -1;
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