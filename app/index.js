'use strict';

var pokeList = angular.module('pokeninho', []);


pokeList.controller('listPokemon',
	function ($scope, $http) {
		// Bouger le background-position pour avoir le bon pokemon
		$scope.getSpriteStyle = function (id) {
			var x = 0;
			var y = 0;
			//Ancien pokedex
			if (id < 650) {
				y = (Math.floor(id / 31));
				if (id % 31 == 0) {
					x = 30 * (-96);
					y = (y - 1) * (-96)
				} else {
					x = (((id % 31) - 1) * (-96));
					y = (-96) * y
				}
				//pokedex XY
			} else if (id > 649 && id < 722) {
				id = id - 649;
				y = (Math.floor(id / 9));
				if (id % 9 == 0) {
					x = 8 * (-97) - 1;
					y = (y - 1) * (-104) - 8
				} else {
					x = ((id % 9 - 1) * (-97)) - 1;
					y = ((-104) * y) - 8
				}
				//pokedex Sun Moon
			} else if (id > 721) {
				id = id - 721;
				y = (Math.floor(id / 10));
				if (id % 10 == 0) {
					x = 9 * (-97);
					y = (y - 1) * (-99)
				} else {
					x = ((id % 10 - 1) * (-97));
					y = ((-99) * y)
				}
			}
			return (x) + 'px  ' + (y) + 'px';
		};


		$scope.getCorrectBackgroundImage = function (id) {
			if (id < 650)
				return "top";
			else if (id > 649 && id < 722)
				return "topxy";
			else
				return "topsm";
		};
		// Recupérer les données de l'API
		$scope.params=0;
		
		$scope.showDiv = function (id, nameFr, strId) {
			// $http.get("data/details"+id+".json")
			$scope.params=1;
			$scope.total=0;
			$scope.weakinit()
			$http.get("https://pokeapi.co/api/v2/pokemon/"+id+"/")
			// called asynchronously if an error occurs or server returns response with an error status
			.then(function (response) {
				$scope.pokemonDetails = response.data;
				$scope.pokemonStats = response.data.stats;
				$scope.nameEnu = response.data.name;              
				$scope.url = response.data.sprites.front_default;
				$scope.pokTypes = response.data.types;
				$scope.id=response.data.id;
				$scope.nameFra=nameFr;
				$scope.strId=strId;
				$scope.params=1;

			})
		};

			$http.get("data/PokeListFr.json")
			
			.then(function (response) {

				$scope.pokemons = response.data;
			});
		
	
		var id; 
		$scope.weakness=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

		$scope.supprDotClass = function(weak){
			return weak.toString().replace(".","")

		}
		// $scope.getBgColor= function(value){
		// 	var color="";
		// 	switch(value){
		// 		case 0:
		// 			color="#CCCCCC";
		// 		case 0.25:
		// 			color="#CCFFCC";
		// 		case 0.5:
		// 			color="#88FF88";
		// 		case 1:
		// 			color="#FFFF88";
		// 		case 2:
		// 			color="#FFCC88";
		// 		case 4:
		// 			color="#FF5555";
		// 	}
		// 	console.log(color);

		// 	return color;
		// }

		$scope.getType = function (type) {
			var val, id;

			switch (type) {
				case "flying":
				val = "Vol";
				id=17;
				break;
				case "steel":
				val = "Acier";
				id=1;
				break;
				case "fighting":
				val = "Combat";
				id=2;
				break;
				case "dragon":
				val = "Dragon";
				id=3;
				break;
				case "water":
				val = "Eau";
				id=4;
				break;
				case "fire":
				val = "feu";
				id=6;
				break;
				case "ice":
				val = "Glace";
				id=7;
				break;
				case "bug":
				val = "Insect";
				id=8;
				break;
				case "normal":
				val = "Normal";
				id=9;
				break;
				case "grass":
				val = "Plante";
				id=10;
				break;
				case "poison":
				val = "Poison";
				id=11;
				break;
				case "rock":
				val = "Roche";
				id=13;
				break;
				case "psychic":
				val = "Psy";
				id=12;
				break;
				case "ground":
				val = "Sol";
				id=14;
				break;
				case "ghost":
				val = "Spectr";
				id=15;
				break;
				case "dark":
				val = "Tenebr";
				id=16;
				break;
				case "fairy":
				val = "Fée";
				id=18;
				break;
				case "electric":
				val = "Elec";
				id=5;
				break;
			}
			return {
        		id: id,
        		val: val

    		};
		};
		
		$scope.weakinit = function(){
			$scope.weakness=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1];
			 
				return $scope.weakness;
		}

		$scope.getTableType = function (type) {
				if (type == 1) { //acier
					$scope.weakness[1] *= 0.5;
					$scope.weakness[2] *= 2; 
					$scope.weakness[3] *= 0.5;
					$scope.weakness[6] *= 2;
					$scope.weakness[7] *= 0.5;
					$scope.weakness[8] *= 0.5;
					$scope.weakness[9] *= 0.5;
					$scope.weakness[10] *= 0.5;
					$scope.weakness[11] *= 0;
					$scope.weakness[12] *= 0.5;
					$scope.weakness[13] *= 0.5;
					$scope.weakness[14] *= 2;
					$scope.weakness[17] *= 0.5;
					$scope.weakness[18] *= 0.5;
				} else if (type == 2) { //fight
					$scope.weakness[8] *= 0.5;
					$scope.weakness[12] *= 2;
					$scope.weakness[13] *= 0.5;
					$scope.weakness[16] *= 0.5;
					$scope.weakness[17] *= 2;
					$scope.weakness[18] *= 2;
				} else if (type == 3) { //dragon
					$scope.weakness[10] *= 0.5;
					$scope.weakness[18] *= 2;
					$scope.weakness[3] *= 2;
					$scope.weakness[4] *= 0.5;
					$scope.weakness[5] *= 0.5;
					$scope.weakness[6] *= 0.5;
					$scope.weakness[7] *= 2;
				} else if (type == 4) { //eau
					$scope.weakness[10] *= 2;
					$scope.weakness[1] *= 0.5;
					$scope.weakness[4] *= 0.5;
					$scope.weakness[5] *= 2;
					$scope.weakness[6] *= 0.5;
					$scope.weakness[7] *= 0.5;
				} else if (type == 5) { //Elec
					$scope.weakness[14] *= 2;
					$scope.weakness[17] *= 0.5;
					$scope.weakness[1] *= 0.5;
					$scope.weakness[5] *= 0.5;
				} else if (type == 6) { // feu
					$scope.weakness[1] *= 0.5;
					$scope.weakness[4] *= 2;
					$scope.weakness[6] *= 0.5;
					$scope.weakness[7] *= 0.5;
					$scope.weakness[8] *= 0.5;
					$scope.weakness[10] *= 0.5;
					$scope.weakness[13] *= 2;
					$scope.weakness[14] *= 2;
					$scope.weakness[18] *= 0.5;
				} else if (type == 7) { //glace
					$scope.weakness[13] *= 2;
					$scope.weakness[1] *= 2;
					$scope.weakness[2] *= 2;
					$scope.weakness[6] *= 2;
					$scope.weakness[7] *= 0.5;
				} else if (type == 8) { //bug
					$scope.weakness[10] *= 0.5;
					$scope.weakness[13] *= 2;
					$scope.weakness[14] *= 0.5;
					$scope.weakness[17] *= 2;
					$scope.weakness[2] *= 0.5;
					$scope.weakness[6] *= 2;
				} else if (type == 9) { //normal
					$scope.weakness[15] *= 0; 
					$scope.weakness[2] *= 2; 
				} else if (type == 10) {//herbe
					$scope.weakness[10] *= 0.5;
					$scope.weakness[11] *= 2;
					$scope.weakness[14] *= 0.5;
					$scope.weakness[17] *= 2;
					$scope.weakness[4] *= 0.5;
					$scope.weakness[5] *= 0.5;
					$scope.weakness[6] *= 2;
					$scope.weakness[7] *= 2;
					$scope.weakness[8] *= 2;
				} else if (type == 11) { //poison
					$scope.weakness[10] *= 0.5;
					$scope.weakness[11] *= 0.5;
					$scope.weakness[12] *= 2;
					$scope.weakness[14] *= 2;
					$scope.weakness[18] *= 0.5;
					$scope.weakness[2] *= 0.5;
					$scope.weakness[8] *= 0.5;
				} else if (type == 12) { //psy
					$scope.weakness[12] *= 0.5;
					$scope.weakness[15] *= 2;
					$scope.weakness[16] *= 2;
					$scope.weakness[2] *= 0.5;
					$scope.weakness[8] *= 2;
				} else if (type == 13) { //rocher
					$scope.weakness[10] *= 2;
					$scope.weakness[11] *= 0.5;
					$scope.weakness[14] *= 2;
					$scope.weakness[17] *= 0.5;
					$scope.weakness[1] *= 2;
					$scope.weakness[2] *= 2;
					$scope.weakness[4] *= 2;
					$scope.weakness[6] *= 0.5;
					$scope.weakness[9] *= 0.5;
				} else if (type == 14) { //sol
					$scope.weakness[10] *= 2;
					$scope.weakness[11] *= 0.5;
					$scope.weakness[13] *= 0.5;
					$scope.weakness[4] *= 2;
					$scope.weakness[5] *= 0;
					$scope.weakness[7] *= 2;
				} else if (type == 15) { //ghost
					$scope.weakness[11] *= 0.5;
					$scope.weakness[15] *= 2;
					$scope.weakness[16] *= 2;
					$scope.weakness[2] *= 0;
					$scope.weakness[8] *= 0.5;
					$scope.weakness[9] *= 0;
				} else if (type == 16) { // dark
					$scope.weakness[12] *= 0;
					$scope.weakness[15] *= 0.5;
					$scope.weakness[16] *= 0.5;
					$scope.weakness[18] *= 2;
					$scope.weakness[2] *= 2;
					$scope.weakness[8] *= 2;
				} else if (type == 17) { //vol
					$scope.weakness[10] *= 0.5;
					$scope.weakness[13] *= 2;
					$scope.weakness[14] *= 0;
					$scope.weakness[2] *= 0.5;
					$scope.weakness[5] *= 2;
					$scope.weakness[7] *= 2;
					$scope.weakness[8] *= 0.5;
				} else if (type == 18) { //Fée
					$scope.weakness[11] *= 2;
					$scope.weakness[16] *= 0.5;
					$scope.weakness[1] *= 2;
					$scope.weakness[2] *= 0.5;
					$scope.weakness[3] *= 0;
					$scope.weakness[8] *= 0.5;
				}
				// console.log($scope.weakness)
				return $scope.weakness;
			};

		}
		);


