var foguete, ceu;
var fogueteImg, ceuImg, endImg;
var treasureCollection = 0;
var cashG, obstaculoG;

//Esttados de Jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
    ceuImg = loadImage("ceu-estrelado.jpg");
    fogueteImg = loadImage("aliens.png")
    endImg = loadImage("fimdeJogo.png")

    cashImg = loadImage("cash.png");
    obstaculoImg = loadImage("sword.png");

}

function setup() {
    createCanvas(3000, 1300);

    // plano de fundo se movendo
    ceu = createSprite(width / 2, 200);
    ceu.addImage(ceuImg);
    ceu.velocityY = 6;

    // crie o foguete
    foguete = createSprite(width / 2, height - 130, 40, 40);
    foguete.addAnimation("SahilRunning", fogueteImg);
    foguete.scale = 0.30;


    cashG = new Group();
    obstaculoG = new Group();


}

function draw() {

    if (gameState === PLAY) {

        background(0);
        foguete.x = World.mouseX;

        edges = createEdgeSprites();
        foguete.collide(edges);


        if (ceu.y > height) {
            ceu.y = height / 2;
        }

        createCash();
        createObstaculo();

        if (cashG.isTouching(foguete)) {
            cashG.destroyEach();
            treasureCollection = treasureCollection + 50;


        } else {
            if (obstaculoG.isTouching(foguete)) {
                gameState = END;

                foguete.addAnimation("SahilRunning", endImg);
                foguete.x = width / 2;
                foguete.y = height / 2;
                foguete.scale = 0.6;

                cashG.destroyEach();
                obstaculoG.destroyEach();

                cashG.setVelocityYEach(0);
                obstaculoG.setVelocityYEach(0);

            }
        }

        drawSprites();
        textSize(25);
        fill(255);
        text("Dinheiro: " + treasureCollection, width - 150, 30);
    }
}


function createCash() {
    if (World.frameCount % 200 == 0) {
        var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        cash.addImage(cashImg);
        cash.scale = 0.40;
        cash.velocityY = 5;
        cash.lifetime = 300;
        cashG.add(cash);
    }
}

function createObstaculo() {
    if (World.frameCount % 320 == 0) {
        var obstaculo = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        obstaculo.addImage(obstaculoImg);
        obstaculo.scale = 0.40;
        obstaculo.velocityY = 5;
        obstaculo.lifetime = 300;
        obstaculoG.add(obstaculo);
    }
}