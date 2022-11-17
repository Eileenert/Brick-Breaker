//  ------- variables -------
var x = canvas.width / 2;
var y = canvas.height - 40;
var dx = 1;
var dy = -1;

var ballRadius = 10;

// raquette
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight) - 20;
var paddle_speed = 3;
var couleurPaddle = "#1f7a1f";

// brique
var briqueHeight = 15;
var briquewidth = 50;
var briquePadding = 6;
var brickColumnCount = 7;
var brickOffsetLeft = 20;
var brickOffsetTop = 10;
var brickRowCount = (canvas.width - brickOffsetLeft) / (briquewidth + briquePadding * 2);

var couleur2 = "#4159B9";
var couleur1 = "#66ccff";

//image étoile
var img = document.getElementById("star");

var rightPressed = false;
var leftPressed = false;

var interval = setInterval(draw, 10);

var tempsTimer = 0; //10 secondes de pouvoirs
const timerElement = document.getElementById("timer")