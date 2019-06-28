import {
  ctx,
  charImg,
  rangeNumber,
  enemyImg,
  checkCollision,
  checkOutOfBounds } from './main.js';

// classe du héro
export class Hero {

 // Constructeur de la classe du héros...
 constructor(x, y, dx, dy, w, h, speedX, speedY) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.width = w;
   this.height = h;
   this.speedX = speedX;
   this.speedY = speedY;
   this.faceX = 70;
   this.faceY = 207;
   this.centerX = ((this.x + this.width) - (this.width / 2));
   this.centerY = ((this.y + this.height) - (this.height / 2));
   this.bulletCredits = 10;
   this.bulletsList = new Array(this.bulletCredits);

   for(let i = 0; i < this.bulletCredits; i++){
    this.bulletsList[i] = new Bullet(1,1);
   }
   console.log('this.bulletsList', this.bulletsList);

   // this.update = this.update.bind(this);
}


// Méthode pour afficher le sprite du héro
drawHero() {
  ctx.drawImage(charImg, this.faceX , this.faceY , 74 , 95, this.x, this.y, this.width , this.height);
}


// Méthode qui va modifier les coordonnées du héro.
update(event) {

  // console.log("ca bouge", event.key);



  switch (event.key) {
    case "ArrowRight": // droite

    console.log('d',this.bulletsList);

      if(this.faceY === 310) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.x = (this.x + this.speedX);

      if(checkOutOfBounds(this)){
        alert("dehors");
      }

      this.faceX = 8;
      this.faceY = 120;

      break;

    case "ArrowLeft":
      console.log('A gauche');


      if(this.faceY === 120) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.x = this.x - this.speedX;
      if(checkOutOfBounds(this)){
        alert("dehors");
      }
      this.faceX = 8;
      this.faceY = 310;
      break;

    case "ArrowUp":
      console.log('En haut');


      if(this.faceY === 210) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.y = this.y - this.speedY;
      if(checkOutOfBounds(this)){
        alert("dehors");
      }
      this.faceX = 8;
      this.faceY = 22;
      break;

    case "ArrowDown":
      console.log('En bas');


      if(this.faceY === 22) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.y = this.y + this.speedY;
      if(checkOutOfBounds(this)){
        alert("dehors");
      }
      this.faceX = 8;
      this.faceY = 210;
      break;

    case "a":
      console.log('touche a');
      this.fire();
      break;

    default:
      break;
  }

  // On recalcule le centre du héros
   this.centerX = ((this.x + this.width) - (this.width / 2));
   this.centerY = ((this.y + this.height) - (this.height / 2));
  }

  // Méthode qui permet au héros de tirer une balle
  fire(){

    if (this.bulletsList.length > 0) {
      this.bulletsList[0].isFlying = true;
      this.bulletsList[0].x = this.centerX;
      this.bulletsList[0].y = this.centerY;
      this.bulletsList[0].update();

      // On supprime un crédit
      this.bulletCredits -= 1;

      // On réinitialise la liste des balles disponibles
      for (let i = 0; i < this.bulletCredits; i++) {
        this.bulletsList[i] = new Bullet(1,1);
      }
    } else {
      // On ne fait rien
    }


  }
}

// classe des énnemis
export class Enemies {

  // Constructeur de la classe des énemis
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.speedX = 2;
    this.speedY = 2;
    this.randomMoveTime = rangeNumber(1000,6000);
    var that  = this;
    this.move = setInterval(()=>{that.setTarget();}, this.randomMoveTime);
    this.targetX = rangeNumber(50, stage.width - 50);
    this.targetY = rangeNumber(50, stage.height - 50);
  }

  // Méthode pour afficher l'ennemi
  draw() {
    ctx.drawImage(enemyImg, this.x, this.y, this.width , this.height);
  }

  // Méthode pour mettre à jour les coordonnées du héros
  update() {

    if(this.centerX === this.targetX && this.centerY === this.targetY){
      console.log('atteint ici');
      this.targetX = rangeNumber(50, stage.width - 50);
      this.targetY = rangeNumber(50, stage.height - 50);
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
    }


    if(this.centerX < this.targetX) { // Si la position horizontale de l'énnemi est inférieure à sa cible
      this.x = this.x + this.speedX;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
    } else if (this.centerX > this.targetX) { // Si la position horizontale de l'énnemi est supérieure à sa cible
      this.x = this.x - this.speedX;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
    } else if (this.centerY < this.targetY) { // Si la position verticale de l'énnemi est inférieure à sa cible
      this.y = this.y  + this.speedY;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
    } else if (this.centerY > this.targetY) { // Si la position verticale de l'énnemi est supérieure à sa cible
      this.y = this.y - this.speedY;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
    }


  }

  // Méthode qui change la cible de l'ennemi
  setTarget(){
    this.targetX = rangeNumber(50, stage.width - 50);
    this.targetY = rangeNumber(50, stage.height - 50);
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  }
}

// classe des obstacles
export class Obstacles {

   // Constructeur de la classe des Obstacles
   constructor(x, y, w, h) {
     this.x = x;
     this.y = y;
     this.width = w;
     this.height = h;
    }
}


// Classe des balles
export class Bullet {

  // Constructeur de la classe de balles
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.centerX = (this.x + this.radius);
    this.centerY = (this.y + this.radius);
    this.isFlying = false;
    this.velX = 1;
    this.velY = 1;
  }

  // Méthode pour mettre à jour la position de la balle
  update(){
    this.x += this.velX;
    this.y += this.velY;
    this.centerX = (this.x + this.radius);
    this.centerY = (this.y + this.radius);

   // On vérifie s'il y a collision entre la balle et un ennemi
   Enemies.forEach(enemy => {
     if (checkCollision(this, enemy)){
      console.log('colision entre une balle et un ennemi');
     };
   });


  }

  // Méthode pour dessiner la balle
  drawBullet(){
    ctx.beginPath();
    ctx.fillStyle="#FFF";
    ctx.arc(this.centerX, this.centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
  }


}
