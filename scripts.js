var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*

// rectangle
ctx.beginPath();
ctx.rect(20, 40, 50, 50);   //coordonnées du point supérieur gauche, largeur, hauteur
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();


// cercle
ctx.beginPath();
//coordonnées x,y du centre de l'arc, rayon de l'arc, l'angle de départ et de fin, direction du dessin (false=aiguille montre, true = l'inverse)
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//rectangle mais que contours en couleur
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();

*/





// fonction principale
function draw() {
    // supprime les traces, coordonnées x y coin supérieur gauche et ensuite du coin inférieur droit, toute la zone couverte est effacée
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();

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
    if (y == paddleY - ballRadius && x > paddleX - ballRadius && x < paddleX + paddleWidth + ballRadius) {
        dy = -dy;
    }
    //touche bas == fini
    else if (y + dy > canvas.height - ballRadius) {

        GameOver();

    }

}
setInterval(draw, 20) //appelée toutes les 10 millisecondes