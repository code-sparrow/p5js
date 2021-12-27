let x = 600;
let y = 300;
let side = 60;

function setup() {
    createCanvas(x, y);
}

function draw() {
    strokeWeight(2);
    stroke(51);
    
    line(x/2+side/2, side/2, side/2, y/2+side/2);
    
    fill('red');
    rect(x/2, 0, side, side);
    
    fill('blue');
    rect(0, y/2, side, side);
}
