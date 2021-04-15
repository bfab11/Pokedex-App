/* global $ */
// IIFE pokemonRepository

let pokemonRepository = (function() {
  //Create pokemonList array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#search-bar');
  let pokemonId = 1;
  let modal = document.querySelector('#pokemonModal');

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + capitalizeFirstLetter(pokemon.name) + '</h1>');
    let pokemonImage = $('<img class="modal-img" style="width:60%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    let pokemonHeight = $('<p>Height: ' + pokemon.height + 'm</p>');
    let pokemonWeight = $('<p>Weight: ' + pokemon.weight + 'kg</p>');
    let pokemonTypes = $('<p>Types: ' + pokemon.types + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modal.classList.add('is-visible');
  }

  // Hide modal
  function hideModal() {
    modal.classList.remove('is-visible');
  }

  // Close modal when escape key is pressed
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Close modal when user clicks outside modal
  modal.addEventListener('click', e => {
    let target = e.target;
    if (target === modal) {
      hideModal();
    }
  });

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    listPokemon.classList.add('list-group-item');
    listPokemon.classList.add('list-group-item-action');
    button.innerText =
      '#' + pokemonId + ' ' + capitalizeFirstLetter(pokemon.name);
    button.classList.add('btn', 'btn-danger', 'btn-outline-light');
    button.classList.add('col-sm');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    pokemonId++;
    //logs details of pokemon to console when you click on the button of the Pokemon
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;

        pokemon.types = [];
        for (var i = 0; i < details.types.length; i++) {
          pokemon.types.push(capitalizeFirstLetter(details.types[i].type.name));
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchInput.addEventListener('input', function() {
    let pokemonList = document.querySelectorAll('.list-group-item');
    let filterValue = searchInput.value.toUpperCase();

    pokemonList.forEach(function(pokemon) {
      console.log(pokemon.innerText);
      if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

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
