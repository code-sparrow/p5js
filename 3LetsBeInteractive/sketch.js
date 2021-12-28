let x = 600;
let y = 300;
let side = 60;
let xPos = 0;
let yPos = y/2-side/2;
let dx = 1;
let dy = 10;
let squareIsPaused = false;

function setup() {
    createCanvas(x, y);
}

function draw() {
    background(220);
    strokeWeight(2);
    stroke(51);
    
    xPos += dx;
    
    if (xPos >= x - side){
        dx *= -1;
    }
    if (xPos <= 0){
        dx *= -1;
    }
    
    line(x/2, side/2, xPos+side/2, yPos+side/2);
    
    fill('red');
    rect(x/2-side/2, 0, side, side);
    
    fill('blue');
    rect(xPos, yPos, side, side);
}

function keyPressed() {
    if (keyCode === 32) {
        dx *= -1;
    }
    if (keyCode === UP_ARROW) {
        yPos = max(yPos - dy, 0);
    }
    if (keyCode === DOWN_ARROW) {
        yPos = min(yPos + dy, y - side);
    }
}

function mousePressed() {
    if ((mouseX >= xPos) && (mouseX <= xPos + side) &&
        (mouseY >= yPos) && (mouseY <= yPos + side)) {
        
        squareIsPaused = !squareIsPaused;
        if (squareIsPaused){
            noLoop();
        } else {
            loop();
        }
    }
    if (mouseY >= (y - side)){
        yPos = y - side;
    } else if (mouseY <= side/2){
        yPos = 0;
    } else {
        yPos = mouseY - side/2;
    }
}
