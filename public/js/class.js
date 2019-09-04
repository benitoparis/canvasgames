import {ctx,charImg,rangeNumber,enemyImg,checkOutOfBounds} from './main.js';

// Classe de configuration générale
export class generalConfig {
  // constructeur
  constructor(setInterval){
    this.setInterval = setInterval;
  }

  // Dessiner le nombre de point de vie
  drawHeroLifeCredit(credit) {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#FFFFFF";
    const msg =`Crédit : ${credit}`;
    ctx.strokeText(msg, 550, 20);
  }
}


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
   this.lifeCredits = 3;
   this.isDead = false;
   this.bulletCredits = 10;
   this.bulletsList = new Array(this.bulletCredits);
   this.shootDirection = 'right';
   for(let i = 0; i < this.bulletCredits; i++){
    this.bulletsList[i] = new Bullet(1,1);
   }
}

// Méthode pour afficher le sprite du héro
drawHero() {
  ctx.drawImage(charImg, this.faceX , this.faceY , 74 , 95, this.x, this.y, this.width , this.height);
}

// Méthode qui va modifier les coordonnées du héro.
update(event) {

  switch (event.key) {
    case "ArrowRight":

      if (this.faceY === 310) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.x = (this.x + this.speedX);

      this.faceX = 8;
      this.faceY = 120;
      this.shootDirection = 'right';

      break;

    case "ArrowLeft":

      if (this.faceY === 120) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.x = this.x - this.speedX;
  
      this.faceX = 8;
      this.faceY = 310;
      this.shootDirection = 'left';
      break;

    case "ArrowUp":

      if(this.faceY === 210) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.y = this.y - this.speedY;
     
      this.faceX = 8;
      this.faceY = 22;
      this.shootDirection = 'up';
      break;

    case "ArrowDown":

      if (this.faceY === 22) {
        this.speedX = 20;
        this.speedY = 20;
      }
      this.y = this.y + this.speedY;
            
      this.faceX = 8;
      this.faceY = 210;
      this.shootDirection = 'down';
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

      // Méthode qui détermine la direction de la balle
      switch(this.shootDirection){
        case 'left':
          this.bulletsList[0].velX = -1;
          this.bulletsList[0].velY = 0;
          break;
        case 'right':
          this.bulletsList[0].velX = 1;
          this.bulletsList[0].velY = 0;
          break;
        case 'up':
          this.bulletsList[0].velX = 0;
          this.bulletsList[0].velY = -1;
          break;
        case 'down':
          this.bulletsList[0].velX = 0;
          this.bulletsList[0].velY = 1;
          break;
      }
      this.bulletsList[0].update();

      // On supprime un crédit
      this.bulletCredits -= 1;

      // On réinitialise la liste des balles disponibles
      for (let i = 0; i < this.bulletCredits; i++) {
        this.bulletsList[i] = new Bullet(1,1);
      }
    }
  }

  // Méthode pour réinitialiser la position du héro
  resetHeroPosition() {
    this.x = rangeNumber(10, 550);
    this.y = rangeNumber(10, 300);
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
   };

   // Méthode pour retirer un point de vie
   removeLifeCredit(){
    this.lifeCredits -= 1;
    alert(this.lifeCredits);
    if(this.lifeCredits < 0){
      this.isDead = true;
    }
   }

   // Méthode pour récupérer le nombre de crédit
   getLifeCredit(){
    return this.lifeCredits;
   }

   // On vérifie si le héro est mort
   isHeroDead(){
    return this.isDead;
   }

   // Méthode pour connaitre la direction du joueur
   getDirection(){
     return this.shootDirection;
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

  // Méthode pour mettre à jour les coordonnées de l'énnemi
  update() {

    if(this.centerX === this.targetX && this.centerY === this.targetY){
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

   // Constructeur de la classe des obstacles
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
    this.width = 50;
    this.height = 50;
    this.centerX = (this.x + this.radius + 5);
    this.centerY = (this.y + this.radius + 5);
    this.isFlying = false;
    this.velX = 1;
    this.velY = 1;
  }

  // Méthode pour mettre à jour la position de la balle
  update(){
    this.x += this.velX;
    this.y += this.velY;
    this.centerX = (this.x);
    this.centerY = (this.y);
  }

  // Méthode pour dessiner la balle
  drawBullet(){
    ctx.beginPath();
    ctx.fillStyle="#FFF";
    ctx.arc(this.centerX, this.centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
