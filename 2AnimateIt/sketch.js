let x = 800;
let y = 500;
let side = 60;
let xPos = 0;
let dx = 1;

function setup() {
    createCanvas(x, y);
    frameRate(60);
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
    
    line(x/2, side/2, xPos+side/2, y/2);
    
    fill('red');
    rect(x/2-side/2, 0, side, side);
    
    fill('blue');
    rect(xPos, y/2-side/2, side, side);
}
