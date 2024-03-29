import {ctx, charImg, rangeNumber, enemyDragonImg, enemyKnightImg, enemySkeletonImg} from './main.js';

// Classe de configuration générale
export class GeneralConfig {
  // constructeur
  constructor(setInterval){
    this.setInterval = setInterval;
    this.fps = 60;
    this.stageConfig = [];
    this.playersRanking = [];
    this.playerProgress = {
      id_player: null,
      currentStage: 0,
      totalPoints: 0,
    };
  }
  
  // ***** Appels des Webservices ****** //
  // Récupère un joueur sur le serveur
  getPlayerById(id){

    const that = this;
    console.log('THAT', that);
    console.log("on entre dans getPlayerById");
    
    const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    const myInit = {
      mode: 'cors',
      method:'GET',
      headers: myHeaders
    }
 
    const url = `http://benoit-dev-web.com/api/v1/player/${id}`;

    // Appel au WS
    fetch(url, myInit)
      .then(function(resp){
        console.log('resp', resp);
        // console.log('resp', resp.body.json());
        //return resp.json();
        return resp.json();
      }).then(function(data){
          console.log("data", data);
          that.playerProgress.id_player = data[0].id;
          that.playerProgress.currentStage = data[0].currentStage;
          that.playerProgress.totalPoints = data[0].totalPoints;
          console.log('this.playerProgress', this.playerProgress);

      }).catch(error => {
        // If there is any error you will catch them here
        console.log(error);
        console.log("c est une erreur de playerConfig");
    })
  };

  // Récupère la liste des joueurs et on classe par nombre de points
  getPlayers(){
    const that = this;
    const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    const myInit = {
      mode: 'cors',
      method:'GET',
      headers: myHeaders
    }
 
    const url = `http://benoit-dev-web.com/api/v1/player`;

    // Appel au WS
    fetch(url, myInit)
      .then(function(resp){
        return resp.json();
      }).then(function(data){
        that.playersRanking = data.sort((a, b) => (a.totalPoints < b.totalPoints) ? 1 : -1);
        console.log('this.playersRanking', that.playersRanking);
      }).catch(error => {
        // If there is any error you will catch them here
        console.log(error);
        console.log("c est une erreur de playerConfig");
    })
  };

  // Méthode pour mettre à jour la progression du héros sur le serveur
  updateHero(){
    const that = this;
      
      const myHeaders = new Headers();
      myHeaders.append('Accept', '*/*');
      const myInit = {
        mode: 'cors',
        method:'PUT',
        headers: myHeaders,
        body:JSON.stringify(this.playerProgress)
      }
  
      const url = `http://benoit-dev-web.com/api/v1/player/${this.playerProgress.id_player}`;

      // Appel au WS
      fetch(url, myInit)
        .then(function(resp){
          console.log('resp', resp);
          return resp.json();
        }).then(function(data){
            console.log("data", data);
        }).catch(error => {
          // If there is any error you will catch them here
          console.log(error);
          console.log("c est une erreur sur l'update de playerConfig");
      })
  };

  // On récupère la liste et le paramétrages des tableaux depuis le WS
  getStageList(){

    const that = this;
        
    const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    const myInit = {
      mode: 'cors',
      method:'GET',
      headers: myHeaders
    }
 
    const url = `http://benoit-dev-web.com/api/v1/stage`;

    // Appel au WS
    fetch(url, myInit)
      .then(function(resp){
        console.log('stage', resp);
        return resp.json();
      }).then(function(data){
          console.log("stage", data);
          that.stageConfig = data;
          console.log('that.stageConfig', that.stageConfig);
      }).catch(error => {
        // If there is any error you will catch them here
        console.log(error);
        console.log("c est une erreur");
    })
    
  }

  // ***** Fin des appels aux Webservices ****** //

  // Dessiner le nombre de point de vie sur l'écran
  drawHeroLifeCredit(playerCurrentLifeCredits){
    ctx.font = "14px Arial";
    ctx.fillStyle = "#F0C300";
    const msg =`Crédit : ${playerCurrentLifeCredits}`;
    ctx.strokeText(msg, 550, 20);
  };

  // Dessine le nombre de balle restante
  drawRemainingBullet(playerRemainingBullet){
    ctx.font = "14px Arial";
    ctx.fillStyle = "#F0C300";
    const msg =`Boullet : ${playerRemainingBullet}`;
    ctx.strokeText(msg, 200, 20);
  }

  // Dessiner le nom du stage
  drawStageName(){
    ctx.font = "14px Arial";
    ctx.fillStyle = "#F0C300";
    const msg =`Niveau ${this.playerProgress.currentStage}`;
    ctx.strokeText(msg, 50, 20);
  }

  // Méthode qui renvoie le numéro du niveau
  getStage(){
    return this.stageConfig[this.playerProgress.currentStage];
  }
 
}

// classe du héros
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
   this.shootedBullet = 0;
   this.bulletCredits = 10;
   this.bulletsList = new Array(this.bulletCredits);
   this.shootDirection = 'right';
   for(let i = 0; i < this.bulletCredits; i++){
    this.bulletsList[i] = new Bullet(1,1);
   }
  }

  // Méthode pour afficher le sprite du héros
  drawHero() {
    ctx.drawImage(charImg, this.faceX , this.faceY , 74 , 95, this.x, this.y, this.width , this.height);
  }

  // Méthode qui va modifier les coordonnées du héro.
  update(event) {

    switch (event.key) {
      case "ArrowRight":

        if (this.faceY === 310) {
          this.speedX = 2;
          this.speedY = 2;
        }
        this.x = (this.x + this.speedX);

        this.faceX = 8;
        this.faceY = 120;
        this.shootDirection = 'right';

        break;

      case "ArrowLeft":

        if (this.faceY === 120) {
          this.speedX = 2;
          this.speedY = 2;
        }
        this.x = this.x - this.speedX;
    
        this.faceX = 8;
        this.faceY = 310;
        this.shootDirection = 'left';
        break;

      case "ArrowUp":

        if(this.faceY === 210) {
          this.speedX = 2;
          this.speedY = 2;
        }
        this.y = this.y - this.speedY;
      
        this.faceX = 8;
        this.faceY = 22;
        this.shootDirection = 'up';
        break;

      case "ArrowDown":

        if (this.faceY === 22) {
          this.speedX = 2;
          this.speedY = 2;
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
      
      console.log('this.bulletsList[this.shootedBullet]', this.bulletsList[this.shootedBullet]);
      
      this.bulletsList[this.shootedBullet].isFlying = true;
      this.bulletsList[this.shootedBullet].x = this.centerX;
      this.bulletsList[this.shootedBullet].y = this.centerY;

      // Méthode qui détermine la direction de la balle
      switch(this.shootDirection){
        case 'left':
          this.bulletsList[this.shootedBullet].velX = -1;
          this.bulletsList[this.shootedBullet].velY = 0;
          break;
        case 'right':
          this.bulletsList[this.shootedBullet].velX = 1;
          this.bulletsList[this.shootedBullet].velY = 0;
          break;
        case 'up':
          this.bulletsList[this.shootedBullet].velX = 0;
          this.bulletsList[this.shootedBullet].velY = -1;
          break;
        case 'down':
          this.bulletsList[this.shootedBullet].velX = 0;
          this.bulletsList[this.shootedBullet].velY = 1;
          break;
      }
      // this.bulletsList[this.shootedBullet].update();
    }
  }

  // Méthode pour réinitialiser la position du héro
  resetHeroPosition() {
    this.x = rangeNumber(10, 550);
    this.y = rangeNumber(10, 300);
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  };

  // Méthode pour retirer un point de vie au héro
  removeLifeCredit(){
  this.lifeCredits -= 1;
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

  // Méthode pour récupérer le nombre de balle restant
  getRemainingBullet(){
    return this.bulletsList.length - this.shootedBullet;
  }

}

// classe des énnemis
export class Enemies {

  // Constructeur de la classe des énnemis
  constructor(x, y, w, h, stageInfo) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.speedX = stageInfo.enemyType.enemySpeedX;
    this.speedY = stageInfo.enemyType.enemySpeedY;
    this.enemyType = stageInfo.enemyType;
    this.randomMoveTime = rangeNumber(1000,6000);
    var that  = this;
    this.move = setInterval(()=>{that.setTarget();}, this.randomMoveTime);
    this.targetX = rangeNumber(50, stage.width - 50);
    this.targetY = rangeNumber(50, stage.height - 50);
  }

  // Méthode pour afficher l'ennemi
  draw() {
    let img;
    switch(this.enemyType.img){ // On renseigne l'image de l'ennemie
      case 'enemyDragonImg':
        img = enemyDragonImg;
        break;
      case 'enemyKnightImg':
        img = enemyKnightImg;
        break;
      case 'enemySkeletonImg':
        img = enemySkeletonImg;
        break;
      default:
        img = enemyDragonImg;
    }
    ctx.drawImage(img, this.x, this.y, this.width , this.height);
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
