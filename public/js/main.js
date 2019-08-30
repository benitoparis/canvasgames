import { Hero, Obstacles, Enemies, Bullet, generalConfig } from './class.js';

// Déclaration des variables
const stage = document.getElementById("stage");
/*stage.width = window.innerWidth;
stage.height = window.innerHeight;*/
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


const obstacle =  new Obstacles(412, 65, 70, 50);
/* const enemies = [
	new Enemies(100, 200, 50, 50),
	new Enemies(300, 50, 50, 50),
	new Enemies(400, 100, 50, 50),
	new Enemies(500, 200, 50, 50),
] */

// Méthode pour initialiser les énnemis
export const enemies = [];
const initEnemies = (enemiesToCreate)=> {
	for(let i = 0; i < enemiesToCreate; i++) {
		enemies[i] = new Enemies(rangeNumber(100, 500), rangeNumber(50, 200), 100, 100);
	}
};

initEnemies(3);


// Méthode pour vérifier la collision entre un élément a et b
 export const checkCollision = (a, b) => {

   console.log('a',a);
   console.log('b',b);

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
		10,
		10
);

// Instantiation de la configuration générale
const config = new generalConfig();





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



// Méthode pour dessin le fond
/*const drawBackground = () => {
	ctx.rect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#6AA34D";
    ctx.fill();
}*/

// Dessine l'image du menu
const drawHomeMenu = ()=> {
	ctx.drawImage(backgroundImg, 0 , 0 , 640 , 360, 0 , 0, stage.width , stage.height);
	drawMessages('Appuyez sur Entrée pour jouer');
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

	console.log('log evenement', event);
	hero.update(event);
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
	hero.drawHero();
	if(hero.bulletsList[0].isFlying === true){
		hero.bulletsList[0].drawBullet();
		hero.bulletsList[0].update();
	}
	drawEnemies();
	updateEnemies();
	// Si tous les énemis sont morts
	if (enemies.length === 0) {
		// On arrete la partie
		endGame();
	}
}

// Méthode qui vérifie si le héro est sorti des limites du niveau
export const checkOutOfBounds = (a)=>{

  // if (Hero.centerX > stage.width) ||
  //  Hero.centerX < 0 ||
  //  Hero.centerY > stage.height ||
  //  Hero.centerY < 0 ){

    console.log("Hero.centerX ", a.centerX );
    console.log("stage.width", stage.width);

  if (a.centerX > stage.width - 30 ||
    a.centerX < 0 + 30||
    a.centerY > stage.height - 30 ||
    a.centerY < 0 + 30
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
	ctx.strokeText(msg, 35, stage.height / 2);	
}




