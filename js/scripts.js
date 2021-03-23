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

pokemonList.forEach(function(pokemon) {
  let pokemonPrint = pokemon.name + '[' + pokemon.type + '] ' + '(height: ' + pokemon.height + ')';;

  if (pokemon.height > 1){
    document.write(pokemonPrint + ' - Wow, that\'s big!<br>');
  }
  else {
    document.write(pokemonPrint + "<br>");
  }
});
