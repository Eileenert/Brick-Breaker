document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// -------- fonctions -------


// fonction qui dessine la balle
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#33cc33";
    ctx.fill();
    ctx.closePath();
}

// fonction qui dessine la raquette
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = couleurPaddle;
    ctx.fill();
    ctx.closePath();
}

// fonction qui dessine l'étoile
function drawStar(brickX, brickY) {
    // METTRE UNE IMAGE AVEC FOND NON TRANSPARENTS
    img.style.display = "block";
    paddleWidth = 150;
}


//list contenant les informations sur chaque briques
var briqueList = [];

for (var i = 0; i < brickColumnCount; i++) {
    briqueList[i] = [];
    for (var j = 0; j < brickRowCount; j++) {

        if (i % 4 == 0) {
            briqueList[i][j] = { x: 0, y: 0, status: 2, star: Math.round(Math.random()) }; //met une étoile au hasard dans une double brique
        } else {
            briqueList[i][j] = { x: 0, y: 0, status: 1 };
        }

    }
}

// deessine les briques
function drawBricks() {
    var img = document.getElementById("star");
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {

            if (briqueList[c][r].status >= 1) {

                var brickX = (r * (briquewidth + briquePadding)) + brickOffsetLeft;
                var brickY = (c * (briqueHeight + briquePadding)) + brickOffsetTop;
                briqueList[c][r].x = brickX;
                briqueList[c][r].y = brickY;


                ctx.beginPath();
                ctx.rect(brickX, brickY, briquewidth, briqueHeight);
                if (briqueList[c][r].status == 2) {
                    ctx.fillStyle = couleur2;

                } else if (briqueList[c][r].status == 1) {
                    ctx.fillStyle = couleur1;
                }


                ctx.fill();
                ctx.closePath();
            }

        }
    }


}

// fonction qui detecte les collisions briques/balle
function collisionDetection() {
    statusArray = [];

    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {

            //brique collision
            var b = briqueList[c][r];
            if (b.status >= 1) {
                if (x > b.x && x < b.x + briquewidth && y > b.y && y < b.y + briqueHeight + ballRadius) {
                    dy = -dy;
                    // status correspond à la résistance de la brique
                    b.status -= 1;
                }
            }

            if (b.status == 0 && b.star == 1) { //quand brique casse et contient une étoile

                drawStar(briqueList[c][r].x, briqueList[c][r].y);
                tempsTimer += 5;

                if (inter_running == 0) { // pour ne pas avoir plusieur var timerInterval qui se créent en même temps
                    var timerInterval = setInterval(() => {
                        inter_running = 1;

                        if (tempsTimer - 1 < 0) {
                            tempsTimer = 0;
                            paddleWidth = 75; //remettre la raquette à la bonne taille
                            img.style.display = "none";
                            tempsTimer = "";
                            inter_running = 0;
                            stop(timerInterval);

                        } else {
                            tempsTimer -= 1;
                        }

                    }, 1000)
                }

                b.star -= 1;
            }
            // ensuite pour savoir si il y a encore des briques
            statusArray.push(briqueList[c][r].status);

        }
    }

    // detecte si la dernière brique est cassée    statusArray = [0]
    if (statusArray.length == 1 && statusArray[0] == 0) {
        alert("Level Finished");
    }
}


// fonction game over
function GameOver() {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); // besoin pour que le naviguateur arrête le jeu

    x = canvas.width / 2;
    y = canvas.height - 40;
    draw();
}