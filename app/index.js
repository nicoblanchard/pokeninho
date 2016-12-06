'use strict';

var pokeList = angular.module('pokeninho', []);

pokeList.service('pokeGetInfos', function () {
    var idPok, pokeNome;

    this.getpokId = function () {
        return this.idPok;
    };
    this.setpokId = function (x) {
        this.idPok = x
    };
    this.getpokName = function () {
        return this.pokName;
    };
    this.setpokName = function (x) {
        this.pokeName = x
    }
});

pokeList.controller('listPokemon',
    function ($scope, $http, pokeGetInfos) {
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

        $http.get("data/PokeListFr.json")
        // $http.get("http://pokeapi.co/api/v2/pokemon/?limit=811")
            .then(function (response) {
                $scope.pokemons = response.data;
            });
    }
);

pokeList.controller('detailsPok',
    function ($scope, $http, pokeGetInfos) {
        $scope.getType = function (type) {
            var val;
            switch (type) {
                case "flying":
                    val = "Vol";
                    break;
                case "steel":
                    val = "Acier";
                    break;
                case "fight":
                    val = "Combat";
                    break;
                case "dragon":
                    val = "Dragon";
                    break;
                case "water":
                    val = "Eau";
                    break;
                case "fire":
                    val = "feu";
                    break;
                case "ice":
                    val = "Glace";
                    break;
                case "bug":
                    val = "Insect";
                    break;
                case "normal":
                    val = "Normal";
                    break;
                case "grass":
                    val = "Plante";
                    break;
                case "poison":
                    val = "Poison";
                    break;
                case "rock":
                    val = "Roche";
                    break;
                case "psycho":
                    val = "Psy";
                    break;
                case "ground":
                    val = "Sol";
                    break;
                case "ghost":
                    val = "Spectr";
                    break;
                case "dark":
                    val = "Tenebr";
                    break;
                case "fairy":
                    val = "Fée";
                    break;
            }
            return val;
        };

        $scope.getTypeId = function (url) {
            return (url.substring(30, url.length - 1));
        };
        var id = pokeGetInfos.getpokId();
        $http.get("data/details.json")
        //console.log("http://pokeapi.co/api/v2/pokemon/"+id);
        // $http.get("http://pokeapi.co/api/v2/pokemon/",{params:{"param1": id+"/"}})
        // {params:{"param1": val1, "param2": val2}}
        //
            .then(function (response) {
                //$scope.pokemonDetails = response.data;
                $scope.pokemonStats = response.data.stats;
                $scope.nameEnu = response.data.name;
                $scope.url = response.data.sprites.front_default;
                $scope.pokTypes = response.data.types;

            });
        //}
    }
);


