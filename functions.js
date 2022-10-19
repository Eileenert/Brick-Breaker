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




/* 
Fonctionne, mais j'ai eu un problème lorsque je voulais supprimer les briques donc j'ai changé de méthode


var briqueList = [];
var brique = 0;

class Brique {
    constructor(xb, yb) {
        ctx.beginPath();
        ctx.rect(xb, yb, 50, 15); //coordonnées du point supérieur gauche, largeur, hauteur
        ctx.fillStyle = "#E667CE";
        ctx.fill();
        this.xb = xb;
        this.yb = yb;
    }



}



//fonction qui dessine les briques
function drawBricks() {

    // x
    for (let yb = 5; yb < canvas.height / 2; yb += briqueHeight + 5) {
        // y
        for (let xb = 25; xb < canvas.width - 50; xb += briquewidth + 5) {
                brique = new Brique(xb, yb); // STOCKER DANS UNE LISTE ET CHANGER LA FONCTION COLLISION / CREER UNE METHODE DELETE DANS LA CLASSE BRIQUE
                briqueList.push(brique);
            }

        }
    }


// collison briques

function collision() {
    //x > brique.x et x < brique.x + brique.width
    // et y > brique.y et y < brique.y + brique.height

    for (var i in briqueList) {
        if (x > briqueList[i].xb && x < briqueList[i].xb + briquewidth && y > briqueList[i].yb && y < briqueList[i].yb + briqueHeight) {
            dy = -dy;

            //ctx.clearRect(xb, yb, briquewidth, briqueHeight);
            //briqueList.splice(briqueList[i], 1);
        }
    }

}

*/


var briqueList = [];

for (var i = 0; i < brickColumnCount; i++) {
    briqueList[i] = [];
    for (var j = 0; j < brickRowCount; j++) {

        if (i % 4 == 0) {
            briqueList[i][j] = { x: 0, y: 0, status: 2 };
        } else {
            briqueList[i][j] = { x: 0, y: 0, status: 1 };
        }

    }
}

function drawBricks() {

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

function collisionDetection() {
    statusArray = [];

    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {

            //brique collision
            var b = briqueList[c][r];
            if (b.status >= 1) {
                if (x > b.x && x < b.x + briquewidth && y > b.y && y < b.y + briqueHeight + ballRadius) {
                    dy = -dy;
                    //-= CAR JE VEUX ENSUITE QUE LE STATUS CORRESPONDE A LA RESISTANCE DE LA BRIQUE
                    b.status -= 1;
                }
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