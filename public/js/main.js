import { Hero, Obstacles, Enemies, Bullet, generalConfig } from './class.js';

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 640;
stage.height= 360;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let fps = 60;
export const charImg = new Image();
const tileFloorHouseImg = new Image();
const tileChairHouseImg = new Image();
const backgroundImg = new Image();
export const enemyImg = new Image();

//on utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");

// Méthode pour trouver un chiffre compris entre a et b
export const rangeNumber = (a,b)=> {
	return Math.floor((Math.random() * b)) + a;
}

// Instantiation de la configuration générale
export const config = new generalConfig();

let hero = {};
let enemies = [];

// Méthode pour initialiser le héros
const InitHero = ()=> {
	// On initialise le héros
	hero = new Hero (100,100,1,1,74,95,10,10);
}

// On initialise les énnemis
const initEnemies = (nbEnemies)=> {
	for(let i = 0; i < nbEnemies; i++) {
		enemies[i] = new Enemies(rangeNumber(100, 500), rangeNumber(50, 200), 100, 100);
	}
};

// Méthode pour initialiser les sprites animés
const initSprites = ()=> {
	InitHero();
	initEnemies(rangeNumber(2,3));
}





// On crée les obstacles
const obstacle =  new Obstacles(412, 65, 70, 50);

// Méthode pour vérifier la collision entre un élément a et b
 export const checkCollision = (a, b) => {

	if((a.x < b.centerX) && (b.centerX < (a.x + a.width))
	 && (a.y < b.centerY)
	 && (b.centerY < (a.y + a.height))) {
		 return true;
	} else {
		return false;
	}
}




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
	//ctx.drawImage(charImg, 0, 0);
		drawHomeMenu();
	};

	// On charge une autre image
	enemyImg.src = '../img/dragon.png';
	enemyImg.onload = () => {
	console.log('backgroundImg chargée');
	// ctx.drawImage(charImg, 0, 0);
	};

}
loadImage();

// Dessine l'image du menu
const drawHomeMenu = () => {
	ctx.drawImage(backgroundImg,0,0,640,360,0,0,stage.width,stage.height);
	drawMessages('Appuyez sur Entrée pour jouer');
	initSprites();
}

// Dessine l'image de fond
const drawBackground = ()=> {
	ctx.drawImage(backgroundImg, 0 , 0 , 640 , 360, 0 , 0, stage.width , stage.height);
}




// // Dessine le parquet au sol
// const drawFloor = ()=> {
// 	    let indexX = 0;
//     let indexY = 0;
//     [...new Array(41)].forEach(item => {
//     		[...new Array(20)].forEach(data => {
// 				ctx.drawImage(tileFloorHouseImg, 128 , 128 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
// 				indexY++
// 				if(indexY === 20){
// 					indexY = 0;
// 				}
//     		});
//     	indexX++;
//     });
// }

// // dessine des chaises
// const drawChair = () => {
// 	let indexX = 0;
//     let indexY = 0;
//     [...new Array(41)].forEach(item => {
//     		[...new Array(20)].forEach(data => {
//     			if (Math.random() > 0.8){
//     				ctx.drawImage(tileChairHouseImg, 322 , 193 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
//     			}

// 				indexY++
// 				if(indexY === 20){
// 					indexY = 0;
// 				}
//     		});
//     	indexX++;
//     });
// }



const updateHero = (event) => {
	
	const x = hero.x;
	const y = hero.y;
	const centerX = hero.centerX;
	const centerY = hero.centerY;
	
	hero.update(event);
	
	if(checkOutOfBounds()){ // Si le héro n'est pas en dehors du terrain
		hero.x = x;
		hero.y = y;
		hero.centerX = centerX;
		hero.centerY = centerY;
	} 
}

const launchGame = (event) => {
	console.log('event', event);
	if (event.keyCode === 13) { // si touche entrée
		// Méthode pour rafraichir l'image
		config.setInterval =  setInterval(drawAll, 1000 / fps);
		setTimeout(startRefresh, 5000);
		return startRefresh;
	}
};

// Méthode qui met fin au jeu
const endGame = () => {
	clearInterval(config.setInterval);
}

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', updateHero);

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', launchGame);


// Méthode pour dessiner tous les énnemis de la liste
const drawEnemies = () => {
	// On intère sur chaque énnemies de la liste
	enemies.forEach(enemy => {
		enemy.draw();
		console.log('draw enemy');
	});
}

// Méthode pour mettre à jour les coordonnées des énnemis
const updateEnemies = () => {
	enemies.forEach(enemy=> {
		enemy.update();
	});
}

// Méthode pour afficher tous les éléments dans l'animation
const drawAll = () => {
	drawBackground();
	config.drawHeroLifeCredit(hero.getLifeCredit());
	hero.drawHero();
		
	// On vérifie s'il y a collision entre la balle et un ennemi
	enemies.forEach(enemy => {
		if (checkCollision(enemy, hero.bulletsList[0])){
			console.log('colision entre une balle et un ennemi');
			killEnemy(enemy);
		};
	});

	// On vérifie s'il y a collision entre le héro et un ennemi
	enemies.forEach(enemy => {
		if (checkCollision(enemy, hero)){
			console.log('colision entre une balle et un ennemi');
			if(hero.isHeroDead()){ // Si le héro est mort
				// On arrete la partie
				endGame();
				// On indique un message
				drawMessages('Perdu ! La partie est terminée');
				setTimeout(drawHomeMenu, 2000);
			} else {
				hero.removeLifeCredit();
				hero.resetHeroPosition();
			}

		};
	});
	
	if(hero.bulletsList[0].isFlying === true){
		hero.bulletsList[0].drawBullet();
		hero.bulletsList[0].update();
	}
	drawEnemies();
	updateEnemies();

	// Si tous les énnemis sont morts
	if (enemies.length === 0) {
		// On arrete la partie
		endGame();
		// On indique un message
		drawMessages('Bravo, la partie est terminée');
		setTimeout(drawHomeMenu, 2000);
	}
}

// Méthode qui vérifie si le héro est sorti des limites du niveau
export const checkOutOfBounds = () => {

  if (
	hero.centerX > stage.width - 30 ||
    hero.centerX < 0 + 30 ||
    hero.centerY > stage.height - 30 ||
    hero.centerY < 0 + 30
    ){
    return true;
  } else {
    return false;
  }

};








// On récupère les points du joueur depuis le backend
/* const url = "http://localhost:3000/api/info";

fetch(url)
  .then(function(resp){
		console.log('resp', resp);
		console.log('resp', resp.body.json());
		return resp.json();
	}).then(function(data){
			console.log("data", data);
	}).catch(error => {
		// If there is any error you will catch them here
		console.log("c est une erreur");
}); */


// Méthode pour trouver l'index de l'ennemi qui a été touché
export const killEnemy = (targetEnemy) => {
  const killedEnemyIndex = enemies.findIndex(enemy =>{
    return enemy.x === targetEnemy.x;
  });
  alert("killedEnemyIndex");
  hero.bulletsList[0].isFlying === false;
  enemies.splice(killedEnemyIndex, 1);
}

// Méthode pour écrire des messages sur l'écran
const drawMessages = (msg) => {
	ctx.font = "40px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.strokeStyle = "#FFFFFF";
	ctx.fillText(msg, 35, stage.height / 2);	
}
