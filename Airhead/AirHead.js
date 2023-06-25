function startGame() {//begins all functions
    myGameArea.start();//starts the creation of the canvas
    myGameHead = new component(30, 30, "Head.png", 230, 75, "image");//creates the gamehead
    //myGameHeadt = new component(30, 30, "head.gif", 230, 75);
    myGameBody = new component(15,35, "Body.png", 237.5, 105, "image");
    //myGameBodyt = new component(15, 35, "Body.gif", 237.5, 105, "image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myBackground = new component(800, 2000, "Background (2).png", 0, 0, "background")
    myMusic = new sound ("ARCADE_WAR.mp3");
    myMusic.play();
}
//startGame();

var myMusic;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function component(width, height, color, x, y, type) {//the component creation studio
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;//sets the width of object to equal the variable
  this.height = height;//sets the height of object to equal the variable
  this.speedX = 0;//sets the speed in the x direction to 0
  this.speedY = 0;//sets the speed in the y direction to 0
  this.x = x;//sets the spwan point in the x value to variable
  this.y = y;//sets the spawn point in the y value to variable
  this.update = function(){//what happens when a item updates
  ctx = myGameArea.context;//give area position
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
      if (type == "background") {
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
        } else {
  if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
  ctx.fillStyle = color;//gives the object the color set
  ctx.fillRect(this.x, this.y, this.width, this.height);//lays out the object
  }
  }
  }
  this.newPos = function() {//for movement
    this.x += this.speedX;//changes based on the speed in x direction
    this.y += this.speedY;//changes based on the speed in y direction
     //if (this.type == "background") {
     //if (this.y == (1)) {
        //this.y = 0;
      //}
   // }
    //this.hitLeft();//to keep from moving to far left
    //this.hitRight();//to keep from moving to far right
  } 

  this.hitRight = function() {//stops object
    var rightBoundary = myGameArea.canvas.width - this.width;//sets the stoping place of the boundary
    if (this.x > rightBoundary) {//to show to stop at this point
      this.x = rightBoundary;//sets x value next to the boundary
    }
  }
  this.hitLeft = function() {//evry thing as hit right but left
    var leftBoundary = 0;
    if (this.x < leftBoundary) {
      this.x = leftBoundary;
    }
  }
  this.crashWith = function(otherobj) {//to create collision
    var myleft = this.x;//sets the left side
    var myright = this.x + (this.width);//sets the rightside
    var mytop = this.y;//sets the top side
    var mybottom = this.y + (this.height);//sets the bottom side
    var otherleft = otherobj.x;//the thing to crash, set left
    var otherright = otherobj.x + (otherobj.width);//set right
    var othertop = otherobj.y;//set top
    var otherbottom = otherobj.y + (otherobj.height);//set bottom
    var crash = true;//sets true if
    if ((mybottom < othertop) ||//if bottom is less the top
    (mytop > otherbottom) ||//if top is more then bottom
    (myright < otherleft) ||//basically you get the idea
    (myleft > otherright)) {//really, why are you still going
      crash = false;//oposses the crash to show it is this
    }
    return crash;//does it for both objects
  }
}

var myObstacles = [];//clouds


var myObstaclesR = [];//rockets


var myObstaclesD = [];//Drones


var myPowerUps = [];


var myPowerUpsb = [];


var myPowerUpsS = [];


function updateGameArea() {//update the canvas per frame
  var y, width, gap, minWidth, maxWidth, minGap, maxGap, Gap, GAP;//makes variables
  for (i = 0; i < myObstacles.length; i += 1) {//if not created, create
    if (myGameHead.crashWith(myObstacles[i])) {//sets to crash
      myGameArea.stop();//ends the game
      return;
    } 
    if (myGameBody.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();//rests the game canvas
  myBackground.update();
  myBackground.newPos();
  //myBackground.speedY = (myGameHead.height/5);
  myGameArea.frameNo += 1;//reads the number of frames
  if (myGameArea.frameNo == 1 || everyinterval(myGameHead.height * 3)) {//if it starts or every 150 units
    y = myGameArea.canvas.height;//sets variables
    minWidth = 25;//sets variables
    maxWidth = 600;//set variables
    width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);//creates the random length
    minGap = 75;//sets variables
    maxGap = 450;//sets variables
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);//sets the gap
    myObstacles.push(new component(width, 30, "white", 0, y + 10));//sets first obstacle
    myObstacles.push(new component(width, 30, "Cloud.png", 0, y + 10, "image"));
    myObstacles.push(new component(700, 30, "white", width + gap,  y + 10));//sets second obstacle
    myObstacles.push(new component(700, 30, "Cloud.png", width+gap, y + 10, "image"));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].y += (myGameHead.height/7)-9.5;
      myObstacles[i].update();
  }
  for (s = 0; s < myPowerUps.length; s += 1) {//if not created, create
    if (myGameHead.crashWith(myPowerUps[s])) {//sets to crash
      myGameHead.width = 15;//myPowerUps[i].width;//10;
      myGameHead.height = 15;//myPowerUps[i].height;
      myGameBody.x = (myGameHead.x);
      myGameBody.y = (myGameHead.y + myGameHead.height);
      //return;
    } 
    if (myGameBody.crashWith(myPowerUps[s])) {//sets to crash
      myGameHead.width = 15;//myPowerUps[i].width;//10;
      myGameHead.height = 15;//myPowerUps[i].height;
      myGameBody.x = (myGameHead.x);
      myGameBody.y = (myGameHead.y + myGameHead.height);
    }
  }
  if (myGameArea.frameNo == 10 || everyinterval(200)) {
    y = myGameArea.canvas.height;
    Gap = 800;//sets variables
    GAP = Math.floor(Math.random()*(Gap+1));//sets the gap
    myPowerUps.push(new component(15, 15, "#ff6666", GAP, y - 10));//sets first obstacle
    myPowerUps.push(new component(15, 15, "red_pwrup.png", GAP, y - 10, "image"));//sets first obstacle
  }
  for (s = 0; s < myPowerUps.length; s += 1) {
      myPowerUps[s].y += (myGameHead.height/5)-10;
      myPowerUps[s].update();
  }
  for (b = 0; b < myPowerUpsb.length; b += 1) {//if not created, create
    if (myGameHead.crashWith(myPowerUpsb[b])) {//sets to crash
      myGameHead.width = 60;//myPowerUps[i].width;//10;
      myGameHead.height = 60;//myPowerUps[i].height;
      myGameBody.x = (myGameHead.x + 22.5);
      myGameBody.y = (myGameHead.y + myGameHead.height);
     // return;
    }
    if (myGameBody.crashWith(myPowerUpsb[b])) {//sets to crash
      myGameHead.width = 60;//myPowerUps[i].width;//10;
      myGameHead.height = 60;//myPowerUps[i].height;
      myGameBody.x = (myGameHead.x + 22.5);
      myGameBody.y = (myGameHead.y + myGameHead.height);
     // return;
    }
  }
  if (myGameArea == 0 || everyinterval(335)) {
  if (z = 0.1) {
    y = myGameArea.canvas.height;
    Gap = 800;//sets variables
    GAP = Math.floor(Math.random()*(Gap+1));//sets the gap
    myPowerUpsb.push(new component(15, 15, "#66ccff", GAP, y - 10));//sets first obstacle
    myPowerUpsb.push(new component(15, 15, "blue_pwrup.png", GAP, y - 10, "image"));//sets first obstacle
  }
  }
  for (b = 0; b < myPowerUpsb.length; b += 1) {
    myPowerUpsb[b].y += (myGameHead.height/5)-10;
    myPowerUpsb[b].update();
  }
  for (i = 0; i < myPowerUpsS.length; i += 1) {//if not created, create
    if (myGameHead.crashWith(myPowerUpsS[i])) {
      myGameArea.frameNo += 250;
    } 
    if (myGameBody.crashWith(myPowerUpsS[i])) {
      myGameArea.frameNo += 250;
    }
  }
  if (myGameArea == 0 || everyinterval(1020)) {
    y = myGameArea.canvas.height;
    Gap = 800;//sets variables
    GAP = Math.floor(Math.random()*(Gap+1));//sets the gap
    myPowerUpsS.push(new component(15, 15, "#ffff00", GAP, y - 15));//sets first obstacle
    myPowerUpsS.push(new component(15, 15, "green_pwrup.png", GAP, y - 15, "image"));//sets first obstacle
  }
  for (i = 0; i < myPowerUpsS.length; i += 1) {
    myPowerUpsS[i].y += (myGameHead.height/8)-11;
    myPowerUpsS[i].update();
  }
  for (r = 0; r < myObstaclesR.length; r += 1) {//if not created, create
    if (myGameHead.crashWith(myObstaclesR[r])) {//sets to crash
      myGameArea.stop();
    } 
    if (myGameBody.crashWith(myObstaclesR[r])) {//sets to crash
      myGameArea.stop();
    } 
  }
  if (myGameArea == 0 || everyinterval(myGameHead.height * 3.5)) {
    y = myGameArea.canvas.height;
    Gap = 800;//sets variables
    GAP = Math.floor(Math.random()*(Gap+1));//sets the gap
    myObstaclesR.push(new component(15, 50, "#cc6600", GAP, y + 10));//sets first obstacle
    myObstaclesR.push(new component(15, 50, "rocket.png", GAP, y + 10, "image"));//sets first obstacle
  }
  for (r = 0; r < myObstaclesR.length; r += 1) {
    myObstaclesR[r].y += (myGameHead.height/5)-17;
    myObstaclesR[r].update();
  }
  for (d = 0; d < myObstaclesD.length; d += 1) {//if not created, create
    if (myGameHead.crashWith(myObstaclesD[d])) {//sets to crash
      myGameArea.stop();
    } 
    if (myGameBody.crashWith(myObstaclesD[d])) {//sets to crash
      myGameArea.stop();
    } 
  }
  if (myGameArea == 0 || everyinterval(myGameHead.height * 3.5)) {
    y = myGameArea.canvas.height;
    Gap = 800;//sets variables
    GAP = Math.floor(Math.random()*(Gap+1));//sets the gap
    myObstaclesD.push(new component(55, 10, "#595959", GAP, y + 10));//sets first obstacle
    myObstaclesD.push(new component(55, 10, "Drone.png", GAP, y + 10, "image"));
  }
  for (d = 0; d < myObstaclesD.length; d += 1) {
    myObstaclesD[d].y += (myGameHead.height/5)-9.5;
    myObstaclesD[d].x += -3;
    myObstaclesD[d].update();
  }
  
  if (myGameHead.height > 70) {
    myGameArea.stopA();
    return;
  }
  //if (myGameHead.width < 5) {
    //myGameArea.stopB();
    //return;
  //}
  myGameBody.speedX = 0;
  myGameBody.speedY = 0;
  myGameHead.speedX = 0;//resets the speed
  myGameHead.speedY = 0; //resets the speed
  if (myGameArea.keys && myGameArea.keys[37]) {myGameHead.speedX = -9.5; myGameBody.speedX = -9.5; }
  if (myGameArea.keys && myGameArea.keys[39]) {myGameHead.speedX = 9.5; myGameBody.speedX = 9.5; }//for movement left and right
  if (myGameArea.keys && myGameArea.keys[38]) {
    myGameHead.width = 45;
    myGameHead.height = 45;
    myGameBody.x = (myGameHead.x + 15);
    myGameBody.y = (myGameHead.y + 45);
    //speed += -0.15;
  }
  if (myGameArea.keys && myGameArea.keys[40]) {  
    myGameHead.width = 30;
    myGameHead.height = 30;
    myGameBody.x = (myGameHead.x + 7.5);
    myGameBody.y = (myGameHead.y + 30);
    //speed += 0.15;
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGameHead.newPos();//sets the new placement of the character
  myGameHead.update();//recreates the character 
  myGameBody.newPos();
  myGameBody.update();
}

var myGameArea = {//canvas item info
  canvas : document.createElement("canvas"),//what this is
  start : function() {//defines what "start" means
    this.canvas.width = 800;//sets the width
    this.canvas.height = 500;//sets the height
    this.context = this.canvas.getContext("2d");//sets it to a 2d scale
    //document.body.insertBefore(this.canvas, document.body.childNodes[0]);//IDK
    const header = document.getElementById("myHeader");
    header.insertAdjacentElement("afterend", this.canvas);
    this.frameNo = 0;//sets the frame(might be this)
    this.interval = setInterval(updateGameArea, 20);//how many times to create the new frame
    window.addEventListener('keydown', function (e) {//this makes the arrow keys work
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {//this also does
      myGameArea.keys[e.keyCode] = false; 
    })
  }, 
  clear : function(){//sets what clear does
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);//resets the game for movement
  },
  stop : function() {//sets what stop does
    clearInterval(this.interval);//stops game
    myMusic.stop();
    var canvas = document.getElementById("viewport");
    ctx.font = "125px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER",20,250); 
  },
  stopA : function() {//sets what stop does
    clearInterval(this.interval);//stops game
    var canvas = document.getElementById("viewport");
    ctx.font = "125px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("you BLEW up",20,250);
  },
  stopB : function() {
    clearInterval(this.interval);
    var canvas = document.getElementById("viewport");
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("you Disappeared",20,150);
  }
}

function everyinterval(n) {//IDK what this does
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}