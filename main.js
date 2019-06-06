// Déclaration des variables
const stage = document.getElementById("stage");
/*stage.width = window.innerWidth;
stage.height = window.innerHeight;*/
stage.width = 640;
stage.height= 360;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 60;
const charImg = new Image();
const tileFloorHouseImg = new Image();
const tileChairHouseImg = new Image();
const backgroundImg = new Image();
const enemyImg = new Image();

// Méthode pour trouver un chiffre compris entre a et b
const rangeNumber = (a,b)=> {
	return Math.floor((Math.random() * b)) + a;
}



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
		ctx.drawImage(charImg, this.faceX , this.faceY , 74 , 95, this.x, this.y, this.width , this.height);
	}


	// Méthode qui va modifier les coordonnées du héro.
	update(event) {

		switch (event.key) {
			case "6": // Se déplace à droite
				console.log('A droite');
				
				this.faceX = 8;
				this.faceY = 120;

				// On modifie les coordonnées du héros
				this.x = (this.x + this.speedX);
				this.centerX = ((this.x + this.width) - (this.width / 2));
				this.centerY = ((this.y + this.height) - (this.height / 2));

				if (checkCollision(obstacle, this)) { // Si colision entre le héros et les obstacles on réinitialise les anciennes coordonnées du héros
					this.x = (this.x - this.speedX);
					this.centerX = ((this.x + this.width) - (this.width / 2));
					this.centerY = ((this.y + this.height) - (this.height / 2));
				}
							
				break;

			case "4": // Se déplace à gauche
				console.log('A gauche');
				
				this.faceX = 8;
				this.faceY = 310;
				// On modifie les coordonnées du héro
				this.x = this.x - this.speedX;
				this.centerX = ((this.x + this.width) - (this.width / 2));
				this.centerY = ((this.y + this.height) - (this.height / 2));

				if (checkCollision(obstacle, this)) { // Si colision entre le héros et les obstacles on réinitialise les anciennes coordonnées du héros
					this.x = this.x + this.speedX;
					this.centerX = ((this.x + this.width) - (this.width / 2));
					this.centerY = ((this.y + this.height) - (this.height / 2));
				} 
				break;
			
			case "8": // Se déplace en haut
				console.log('En haut');
	
				// On modifie les coordonnées du héro
				this.faceX = 8;
				this.faceY = 22;
				this.y = this.y - this.speedY;
				this.centerX = ((this.x + this.width) - (this.width / 2));
				this.centerY = ((this.y + this.height) - (this.height / 2));

				if(checkCollision(obstacle, this)){ // Si colision entre le héros et les obstacles on réinitialise les anciennes coordonnées du héros
					this.y = this.y + this.speedY;
					this.centerX = ((this.x + this.width) - (this.width / 2));
					this.centerY = ((this.y + this.height) - (this.height / 2));
				}
			
				break;

			case "2": // Se déplace en bas
				console.log('En bas');
				this.faceX = 8;
				this.faceY = 210;
				this.y = this.y + this.speedY;
				this.centerX = ((this.x + this.width) - (this.width / 2));
				this.centerY = ((this.y + this.height) - (this.height / 2));
				if(checkCollision(obstacle, this)){ // Si colision entre le héros et les obstacles on réinitialise les anciennes coordonnées du héros
					this.y = this.y - this.speedY;
					this.centerX = ((this.x + this.width) - (this.width / 2));
					this.centerY = ((this.y + this.height) - (this.height / 2));
				}

				break;

			default:
				break;
		}
		//event.preventDefault();


	}
	

 }


// classe des obstacles
class Obstacles {

 	// Constructeur de la classe des Obstacles
 	constructor(x, y, w, h) {
 		this.x = x;
 		this.y = y;
 		this.width = w;
 		this.height = h;
  	}

}


// classe des énnemis
class Enemies {

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
}



const obstacle =  new Obstacles(412, 65, 70, 50);
const enemies = [
	new Enemies(100, 200, 50, 50),
	new Enemies(300, 50, 50, 50),
	new Enemies(400, 100, 50, 50),
	new Enemies(500, 200, 50, 50),
]

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
		2,
		2
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


	// On charge le background complet image
	backgroundImg.src = '../img/background.png';
	backgroundImg.onload = () => {
	console.log('backgroundImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};

	// On charge une autre image
	enemyImg.src = '../img/dragon.png';
	enemyImg.onload = () => {
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










const updateHero = (event) => {

	console.log('log evenement', event);
	hero.update(event);
}

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', updateHero);




// Méthode pour dessiner tous les énnemis de la liste
const drawEnemies = () => {
	// On intère sur chaque énnemies de la liste
	enemies.forEach(enemy => {
		enemy.draw();
		console.log('dsds');
	});

}

// Méthode pour mettre à jour les coordonnées des énnemis
const updateEnemies = () => {
	enemies.forEach(enemy=> {
		enemy.update();
	});
}

// Méthode pour afficher tous les éléments à afficher dans l'animation
const drawAll = () => {
	drawBackground();
	hero.drawHero();
	drawEnemies();
	updateEnemies();
	
	
}


// Méthode pour rafraichir l'image
const startRefresh = setInterval(drawAll, 1000 / fps);

setTimeout(startRefresh, 5000);