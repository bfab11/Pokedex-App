// IIFE pokemonRepository
let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
	let pokeList = document.querySelector('.pokemon-list');
	//Create pokemonList array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function showModal(pokemon) {
	modalContainer.innerHTML = '';

	let modal = document.createElement('div');
	modal.classList.add('modal');

	let closeButtonElement = document.createElement('button');
	closeButtonElement.classList.add('modal-close');
	closeButtonElement.innerText = 'Close';
	closeButtonElement.addEventListener('click', hideModal);

	// pokemon name to display
	let pokemonName = document.createElement('h1');
	pokemonName.innerText = pokemon.name;

	// pokemon height to display
	let pokemonHeight = document.createElement('p');
	pokemonHeight.innerText = 'Height: ' + pokemon.height;

	// pokemon image to display
	let containerImage = document.querySelector('#image-container');
	let pokemonImage = document.createElement('img');
	pokemonImage.src = pokemon.imageUrl;

	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	modal.appendChild(closeButtonElement);
	modal.appendChild(pokemonName);
	modal.appendChild(pokemonHeight);
	modal.appendChild(pokemonImage);
	modalContainer.appendChild(modal);

	modalContainer.classList.add('is-visible');
}

// Hide modal
function hideModal() {
	modalContainer.classList.remove('is-visible');
}

// Close modal when escape key is pressed
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
		hideModal();
	}
});

// Close modal when user clicks outside modal
modalContainer.addEventListener('click', (e) => {
	let target = e.target;
	if (target === modalContainer) {
		hideModal();
	}
});

  function add(pokemon) {
    // if (
      // typeof pokemon === "object" &&
      // "name" in pokemon
    // ) {
      pokemonList.push(pokemon);
    // } else {
    //   console.log("pokemon is not correct");
    // }
  }

  function getAll() {
    return pokemonList;
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

function showDetails(pokemon){
		loadDetails(pokemon).then(function (){
			showModal(pokemon);
		});
	}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
		showDetails: showDetails,
		showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
