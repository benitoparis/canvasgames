console.log("hello");

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = window.innerWidth;
stage.height = window.innerHeight;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 60;
const charImg = new Image();




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
 		// this.heroMove = this.heroMove.bind(this);

 	}


	// Méthode pour afficher le sprite du héro
	drawHero() {
		console.log('ou la', this.x);
		ctx.drawImage(charImg, 70 , 207 , 74 , 95, this.x, this.y, this.width , this.height);

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
// Méthode qui va modifier les coordonnées du héro.
hero.heroMove = (event) => {

	console.log("ca bouge", event.key);

	console.log('la', hero.x);

	switch (event.key) {
		case "6":
			console.log('ici', hero.x);
			console.log('A droite');
			hero.x = (hero.x + hero.speedX);
			console.log('hero.x', hero.x);
			break;

		case "4":
			console.log('A gauche');
			hero.x = hero.x - hero.speedX;
			break;
		
		case "8":
			console.log('En haut');
			hero.y = hero.y - hero.speedY;
			break;

		case "2":
			console.log('En bas');
			hero.y = hero.y + hero.speedY;
			break;

		default:
			break;
	}
}


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


console.log('hero', hero);

// Méthode pour afficher tous les éléments à afficher dans l'animation
const drawAll = () => {

drawBackground();
hero.drawHero();


}



// Méthode pour rafraichir l'image
const startRefresh = setInterval(drawAll, 1000/ fps);

setTimeout(startRefresh, 5000);

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', hero.heroMove);