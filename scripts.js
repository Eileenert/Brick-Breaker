var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



// fonction principale
function draw() {
    // supprime les traces, coordonnées x y coin supérieur gauche et ensuite du coin inférieur droit, toute la zone couverte est effacée
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();

    ctx.font = "bold 20px sherif" //temps pouvoir
    ctx.fillText(`${tempsTimer}`, 20, canvas.height - 20, 100);

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += paddle_speed;
        //pour pas que la raquette sorte de  l'écran
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= paddle_speed;
        //pour pas que la raquette sorte de  l'écran
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    // rebondir côtés
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // rebondir haut
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    // si balle aux coordonnées de la raquette -> rebondit  (pas comme dans le tuto)
    //changer pour que ça cogne les côtés
    if (y == paddleY - ballRadius && x >= paddleX - ballRadius && x <= paddleX + paddleWidth + ballRadius) {
        dy = -dy;
    }
    //touche bas == fini
    else if (y + dy > canvas.height - ballRadius) {
        GameOver();
    }


}
setInterval(draw, 20) //appelée toutes les 10 millisecondes