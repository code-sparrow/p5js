let x = 600; //canvas width
let y = 300; //canvas height
let side = 40; //square side length
let xPos = 0;
let yPos = y/2-side/2;
let dx = 1;
let dy = 10;
let theta = -45; // angle
let dTheta = 1;
let squareIsPaused = false;
let mode = 'lr'

function setup() {

    createCanvas(x, y);
    //rectMode(CENTER);
    frameRate(30);

    // set up buttons
    // which trigger 'Mode' functions
    let col = color(25, 23, 200, 50);

    leftRightButton = createButton('Left-Right');
    leftRightButton.position(x*0.65, 0);
    leftRightButton.style('background-color', col);
    leftRightButton.mousePressed(leftRightMode);

    pendulumButton = createButton('Pendulum');
    pendulumButton.position(x*0.85, 0);
    pendulumButton.style('background-color', col);
    pendulumButton.mousePressed(pendulumMode);
}

function draw() {
    background(220);
    stroke(51);

    //if in left-right mode
    //increment dx and calculate (xPos, yPos)
    // and keep angle at zero
    if (mode === 'lr'){
        xPos += dx;
        
        // keep with x boudaries
        if (xPos >= x - side){
            dx *= -1;
        }
        if (xPos <= 0){
            dx *= -1;
        }
        theta = 0;
    }

    // if in pendulum mode
    // increment angle and calculate (xPos, yPos)
    // and draw text showing coordinates of pendulum
    if (mode === 'p'){
        theta += dTheta;
        if (theta >= 45){
            dTheta *= -1;
        }
        if (theta <= -45){
            dTheta *= -1;
        }
        xPos = x/2 - side/2 + y/1.5*sin(radians(theta));
        yPos = 0 + y/1.5*cos(radians(theta));
        fill('black')
        textSize(11);
        textStyle(NORMAL);
        strokeWeight(0.1);
        text('X: ' + round(xPos, 2), xPos, yPos + side*1.75);
        text('Y: ' + round(yPos, 2), xPos, yPos + side*2.1);
    }
    
    strokeWeight(2);
    line(x/2, side/2, xPos+side/2, yPos+side/2);
    
    fill('red');
    rect(x/2-side/2, 0, side, side);
    
    fill('blue');
    translate(xPos, yPos);
    rotate(radians(-theta));
    rect(0, 0, side, side);

}

// When in left-right mode and a key is pressed
// do the correct actions
// space bar: changes direction of blue square
// up arrow: moves blue square up
// down arrow: moves blue square down
function keyPressed() {
    if (mode === 'lr'){
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
}

// if in Left-Right mode and mouse is pressed inside blue square
// stop or restart looping
// if mouse is pressed anywhere else (other than on buttons)
// move blue square to that y-coordinate
// also set up conditions to keep blue square on canvas (within boundaries)
function mousePressed() {

    if (mode === 'lr'){
        if ((mouseX >= xPos) && (mouseX <= xPos + side) &&
            (mouseY >= yPos) && (mouseY <= yPos + side)) {
            squareIsPaused = !squareIsPaused;
            if (squareIsPaused){
                noLoop();
            } else {
                loop();
            }
            //console.log(squareIsPaused, 'blue square click loop');
        }
        if (mouseY >= (y - side)){
            yPos = y - side;
        } else if ((mouseY <= 20) && (mouseX >= x*0.65) && (mouseX <= x*0.65+74)){
            // had to add this condition because pressing the Left-Right button
            // was setting yPos to zero
            yPos = y/2-side/2;
        } else if (mouseY <= side/2){
            yPos = 0;
        } else {
            yPos = mouseY - side/2;
        }
    }
}

// if 'Left-Right' button or 'Pendulum' button is clicked
// set mode to 'lr' or 'p'
// and reset squareIsPaused and loop()
// triggered by button click event
function leftRightMode(){
    mode = 'lr';
    //console.log(squareIsPaused, 'lrMode Func');
    squareIsPaused = false;
    loop();
}

function pendulumMode(){
    mode = 'p';
    //console.log(squareIsPaused, 'pMode Func');
    squareIsPaused = false;
    loop();
}
