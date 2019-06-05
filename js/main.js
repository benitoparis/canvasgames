// Déclaration des variables
const stage = document.getElementById("stage");
/*stage.width = window.innerWidth;
stage.height = window.innerHeight;*/
stage.width = 640;
stage.height= 360;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 10;
const charImg = new Image();
const tileFloorHouseImg = new Image();
const tileChairHouseImg = new Image();
const backgroundImg = new Image();



// classe du héro
 class Hero {

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


// classe du héro
class Obstacles {

 	// Constructeur de la classe des Obstacles
 	constructor(x, y, w, h) {
 		this.x = x;
 		this.y = y;
 		this.width = w;
 		this.height = h;
  	}

}


const obstacle =  new Obstacles(412, 65, 66, 55);

// Méthode pour vérifier la collision entre un élément a et un objet b
const checkCollision = (a, b) => {

	console.log("test", b.centerX);
	console.log('obstacle.x', a.x);

	if((a.x < b.centerX) && (b.centerX < (a.x + a.width))
	 && (a.y < b.centerY)
	 && (b.centerY < (a.y + a.height))) {
		 return true;
	} else {
		return false;
	}
}



const hero = new Hero (
		100,
		100,
		1,
		1,
		74,
		95,
		20,
		20
	);



//on utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
const ctx = stage.getContext("2d");

// Méthode pour charger l'image des sprites d héros
const loadImage = () => {
	
	charImg.src = '../img/spritesheet2.png';
	charImg.onload = () => {
		console.log('charImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};

	// On charge une autre image
	tileFloorHouseImg.src = '../img/complete-spritesheet.png';
	tileFloorHouseImg.onload = () => {
		console.log('tileFloorHouseImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};

	// On charge une autre image
	tileChairHouseImg.src = '../img/complete-spritesheet.png';
	tileChairHouseImg.onload = () => {
	console.log('tileChairHouseImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};

	// On charge une autre image
	backgroundImg.src = '../img/background.png';
	backgroundImg.onload = () => {
	console.log('backgroundImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};



}
loadImage();



// Méthode pour dessin le fond
/*const drawBackground = () => {
	ctx.rect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#6AA34D";
    ctx.fill(); 
}*/

// Dessine l'image de fond
const drawBackground = ()=> {
	
	ctx.drawImage(backgroundImg, 0 , 0 , 640 , 360, 0 , 0, stage.width , stage.height);
}




// Dessine le parquet au sol
const drawFloor = ()=> {
	    let indexX = 0;
    let indexY = 0;
    [...new Array(41)].forEach(item => {
    		[...new Array(20)].forEach(data => {
				ctx.drawImage(tileFloorHouseImg, 128 , 128 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
				indexY++
				if(indexY === 20){
					indexY = 0;
				}
    		});
    	indexX++;
    });
}

// dessine des chaises
const drawChair = () => {
	let indexX = 0;
    let indexY = 0;
    [...new Array(41)].forEach(item => {
    		[...new Array(20)].forEach(data => {
    			if (Math.random() > 0.8){
    				ctx.drawImage(tileChairHouseImg, 322 , 193 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
    			}
				
				indexY++
				if(indexY === 20){
					indexY = 0;
				}
    		});
    	indexX++;
    });
}


console.log('hero', hero);




// Méthode pour afficher tous les éléments à afficher dans l'animation
const drawAll = () => {

// drawBackground();



//drawFloor();
// drawChair();
drawBackground();


if(checkCollision(obstacle, hero)){
	if(hero.faceY === 22){ // si regarde en haut
		hero.speedY = 0;
		hero.y +=10;
		hero.centerX = ((hero.x + hero.width) - (hero.width / 2));
 		hero.centerY = ((hero.y + hero.height) - (hero.height / 2));
	} else if(hero.faceY === 120) { // Si regarde à droite
		hero.speedX = 0;
		hero.x -= 10;
		hero.centerX = ((hero.x + hero.width) - (hero.width / 2));
 		hero.centerY = ((hero.y + hero.height) - (hero.height / 2));
	} else if (hero.faceY === 310) {// si regarde à gauche
		hero.speedX = 0;
		hero.x +=10;
		hero.centerX = ((hero.x + hero.width) - (hero.width / 2));
 		hero.centerY = ((hero.y + hero.height) - (hero.height / 2));
	} else if (hero.faceY === 210) { // si regarde en bas
		hero.speedY = 0;
		hero.y -= 10;
		hero.centerX = ((hero.x + hero.width) - (hero.width / 2));
 		hero.centerY = ((hero.y + hero.height) - (hero.height / 2));
	}
};

hero.drawHero();

}



// Méthode pour rafraichir l'image
const startRefresh = setInterval(drawAll, 1000/ fps);

setTimeout(startRefresh, 5000);

const updateHero = (event) => {
	hero.update(event);
}



// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', updateHero);




