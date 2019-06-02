console.log("hello");

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = window.innerWidth;
stage.height = window.innerHeight;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 60;
const charImg = new Image();
const tileFloorHouseImg = new Image();
const tileChairHouseImg = new Image();



// classe d héro
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
 		// this.update = this.update.bind(this);
 

 	}


	// Méthode pour afficher le sprite du héro
	drawHero() {
		console.log('ou la', this.x);
		ctx.drawImage(charImg, 70 , 207 , 74 , 95, this.x, this.y, this.width , this.height);

	}


	// Méthode qui va modifier les coordonnées du héro.
	update(event) {

		// console.log("ca bouge", event.key);

		console.log('la', this.x);

		switch (event.key) {
			case "6":
				console.log('ici', this.x);
				console.log('A droite');
				this.x = (this.x + this.speedX);
				console.log('this.x', this.x);
				break;

			case "4":
				console.log('A gauche');
				this.x = this.x - this.speedX;
				break;
			
			case "8":
				console.log('En haut');
				this.y = this.y - this.speedY;
				break;

			case "2":
				console.log('En bas');
				this.y = this.y + this.speedY;
				break;

			default:
				break;
		}
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
	      	console.log('chargée');
	        // ctx.drawImage(charImg, 0, 0);
	      };

	      // On charge une autre image
	      tileFloorHouseImg.src = '../img/complete-spritesheet.png';
	      tileFloorHouseImg.onload = () => {
	      	console.log('chargée');
	        // ctx.drawImage(charImg, 0, 0);
	      };

	    // On charge une autre image
	    tileChairHouseImg.src = '../img/complete-spritesheet.png';
	    tileChairHouseImg.onload = () => {
	    console.log('chargée');
	    // ctx.drawImage(charImg, 0, 0);
	    };
}
loadImage();



// Méthode pour dessin le fond
const drawBackground = () => {
	ctx.rect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#6AA34D";
    ctx.fill(); 
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



drawFloor();
drawChair();
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




