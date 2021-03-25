// IIFE pokemonRepository
let pokemonRepository = (function () {
  //Create pokemonList array
  let pokemonList = [];

  //Define pokemon objects
  let pokemon1 = {
    name: 'Bulbasaur',
    height: 0.7,
    type: 'Grass/Poison'
  };

  let pokemon2 = {
    name: 'Ivysaur',
    height: 1,
    type: 'Grass/Poison'
  };

  let pokemon3 = {
    name: 'Venasaur',
    height: 2,
    type: 'Grass/Poison'
  };

  //Add pokemon objects into pokemonList array
  pokemonList.push(pokemon1, pokemon2, pokemon3);

  function showDetails(pokemon){
		console.log(pokemon);
	}

  function addListItem(pokemon){
		let pokemonList = document.querySelector(".pokemon-list");
  	let listPokemon = document.createElement("li");
  	let button = document.createElement("button");
  	button.innerText = pokemon.name;
  	button.classList.add("button-class");
  	listPokemon.appendChild(button);
  	pokemonList.appendChild(listPokemon);
    //logs details of pokemon to console when you click on the button of the Pokemon
    button.addEventListener('click', function(event){
			showDetails(pokemon);
		});
	}

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    },
    addListItem: addListItem
  };
})();

 pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

});
