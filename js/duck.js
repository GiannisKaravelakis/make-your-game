//Contains functions for duck spawning, moving and rendering

const duckLayer = document.getElementById('duck-layer');
const ducks = [];

//Size and speed of ducks
const duckSize = 60;
const duckSpeed = 0.15;
const maxDucks = 3;

//Duck image properties
const duckFrameCount = 3;   //number of duck frames in spritrsheet
const frameDuration = 150;  //ms each frame is shown

//Lowest height that ducks can fly to
const duckMaxY = 375;

//Create the duck
function createDuck() {
    const duck = {
        x: 0,
        y: 0,
        directX: 0,
        directY: 0,
        alive: false,
        frame: 0,
        frameTimer: 0,
        el: document.createElement('div')
    };

    duck.el.style.position = 'absolute';
    duck.el.style.width = duckSize + 'px';
    duck.el.style.height = duckSize + 'px';
    duck.el.style.backgroundImage = "url('assets/duck/sprite_newduck_right.png')";
    duck.el.style.backgroundSize = `${duckFrameCount * duckSize}px ${duckSize}px`;
    duck.el.style.backgroundRepeat = 'no-repeat';    
    duck.el.style.willChange = 'transform';
    duck.el.style.display = 'none';

    duckLayer.appendChild(duck.el);
    ducks.push(duck);
    return duck;
}

//Give a duck its spawnpoint and direction
function spawnDuck(duck) {
    duck.x = Math.random() * (containerWidth - duckSize);
    duck.y = duckMaxY - duckSize;

    //Pick a random angle for the duck to fly
    //Chooses roughly between 17 to 163 degrees and 197 to 343 
    //and then gets the x,y coordinates
    //with the cosine and sine functions.
    //This excludes near horizontal flying patterns
    let angle;
    do {
        angle = Math.random() * Math.PI * 2;
    } while (Math.abs(Math.sin(angle)) < 0.3);
    
    duck.directX = Math.cos(angle) * duckSpeed;
    duck.directY = Math.sin(angle) * duckSpeed;
    
    duck.alive = true;
    duck.el.style.display = 'block'; 
}

//Initialize the ducks by creating them
function initDucks() {
    for (let i = 0; i < maxDucks; i++) {
        createDuck();        
    }
}

//Spawn or respawn every duck in the pool at once. Used to start a new wave
function spawnWave() {
    for (const duck of ducks) {
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
        } else if (duck.y >= duckMaxY -duckSize) {
            duck.y = duckMaxY - duckSize;
            duck.directY *= -1;
        }
        
        //Advance animation frame of ducks
        duck.frameTimer += deltaTime;
        if (duck.frameTimer >= frameDuration) {
            duck.frameTimer -= frameDuration;
            duck.frame = (duck.frame + 1) % duckFrameCount;
        }
    }
}

//Render the ducks in the container
function renderDucks() {
    for (const duck of ducks) {
        if (duck.alive) {
            const flip = duck.directX < 0 ? 'scaleX(-1)' : 'scaleX(1)';
            duck.el.style.transform = `translate(${duck.x}px, ${duck.y}px) ${flip}`;
            duck.el.style.backgroundPosition = `-${duck.frame * duckSize}px 0`;
        }                
    }
}