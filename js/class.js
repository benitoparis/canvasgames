import * as game from './game.js';

// classe du héro
 export class Hero {

   // Constructeur de la classe du héro
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
     // this.update = this.update.bind(this);
  }


  // Méthode pour afficher le sprite du héro
  drawHero() {
    console.log('ou la', this.x);
    ctx.drawImage(charImg, this.faceX , this.faceY , 74 , 95, this.x, this.y, this.width , this.height);

    console.log('this.centerX', this.centerX);


  }


  // Méthode qui va modifier les coordonnées du héro.
  update(event) {

    // console.log("ca bouge", event.key);

    console.log('la', this.x);

    switch (event.key) {
      case "6": // droite
        console.log('ici', this.x);
        console.log('A droite');

        console.log('this.x', this.x);

        if(this.faceY === 310) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.x = (this.x + this.speedX);

        this.faceX = 8;
        this.faceY = 120;

        break;

      case "4":
        console.log('A gauche');


        if(this.faceY === 120) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.x = this.x - this.speedX;
        this.faceX = 8;
        this.faceY = 310;
        break;

      case "8":
        console.log('En haut');


        if(this.faceY === 210) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.y = this.y - this.speedY;
        this.faceX = 8;
        this.faceY = 22;
        break;

      case "2":
        console.log('En bas');


        if(this.faceY === 22) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.y = this.y + this.speedY;
        this.faceX = 8;
        this.faceY = 210;
        break;

      default:
        break;
    }

    // On recalcle le centre du héro
    this.centerX = ((this.x + this.width) - (this.width / 2));
     this.centerY = ((this.y + this.height) - (this.height / 2));
  }


 }
