console.log("hello");

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = window.innerWidth;
stage.height = window.innerHeight;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 30;
const charImg = new Image();




// classe d héro
 class Hero {

 	// Constructeur de la classe du héro
 	constructor(x, y, dx, dy, w, h, speedX, speedY) {
 		this.x = x,
 		this.y = y,
 		this.dx = dx;
 		this.dy = dy;
 		this.width = w,
 		this.height = h;
 		this.speedX = speedX;
 		this.speedY = speedY;
 	}


	// Méthode pour afficher le sprite du héro
	drawHero() {
		ctx.drawImage(charImg, 70 , 207 , 74 , 95, this.x, this.y , this.width , this.height);
	}

	// Méthode qui va modifier les coordonnées du héro.
	heroMove(event) {
		console.log("ca bouge", event.key);
		if (event.key !== undefined){
			if (event.key === 102){
				console.log('A droite');
			} else if (event.key === 102){
				console.log('A droite');
			}
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
		10,
		10
	);

document.addEventListener('keypress', hero.heroMove);

//on utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
const ctx = stage.getContext("2d");

// Méthode pour charger l'image des sprites d héros
const loadImage = () => {
	
	      charImg.src = '../img/spritesheet2.png';
	      charImg.onload = () => {
	      	console.log('chargé');
	        // ctx.drawImage(charImg, 0, 0);
	      };
}
loadImage();



// Méthode pour dessin le fond
const drawBackground = ()=> {
	ctx.rect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#6AA34D";
    ctx.fill(); 
}




// Méthode pour afficher tous les éléments à afficher dans l'animation
const drawAll = () => {

drawBackground();
hero.drawHero();

}



// Méthode pour rafraichir l'image
const startRefresh = setInterval(drawAll, 1000/ fps);

setTimeout(startRefresh, 5000);