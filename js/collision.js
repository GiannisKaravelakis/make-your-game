//Check if the center of the crosshair 
//is inside of a duck during a shooting

function checkHit(duck) {
    const crosshairCenterX = crosshairX + crosshairSize / 2;
    const crosshairCenterY = crosshairY + crosshairSize / 2;

    const hitLeft   = crosshairCenterX >= duck.x;
    const hitRight  = crosshairCenterX <= duck.x + duckSize;
    const hitTop    = crosshairCenterY >= duck.y;
    const hitBottom = crosshairCenterY <= duck.y + duckSize;
    
    return hitLeft && hitRight && hitTop && hitBottom;
}