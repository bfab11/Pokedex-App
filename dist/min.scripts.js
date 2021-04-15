let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
    n = document.querySelector('#search-bar'),
    o = 1,
    i = document.querySelector('#pokemonModal');
  function s(e) {
    let t = $('.modal-body'),
      n = $('.modal-title');
    n.empty(), t.empty();
    let o = $('<h1>' + p(e.name) + '</h1>'),
      s = $('<img class="modal-img" style="width:60%">');
    s.attr('src', e.imageUrl);
    let l = $('<p>Height: ' + e.height + 'm</p>'),
      a = $('<p>Weight: ' + e.weight + 'kg</p>'),
      r = $('<p>Types: ' + e.types + '</p>');
    n.append(o),
      t.append(s),
      t.append(l),
      t.append(a),
      t.append(r),
      i.classList.add('is-visible');
  }
  function l() {
    i.classList.remove('is-visible');
  }
  function a(t) {
    'object' == typeof t && 'name' in t
      ? e.push(t)
      : console.log('pokemon is not correct');
  }
  function r(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = []);
        for (var n = 0; n < t.types.length; n++)
          e.types.push(p(t.types[n].type.name));
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function c(e) {
    r(e).then(function() {
      s(e);
    });
  }
  function p(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  return (
    window.addEventListener('keydown', e => {
      'Escape' === e.key && i.classList.contains('is-visible') && l();
    }),
    i.addEventListener('click', e => {
      e.target === i && l();
    }),
    n.addEventListener('input', function() {
      let e = document.querySelectorAll('.list-group-item'),
        t = n.value.toUpperCase();
      e.forEach(function(e) {
        console.log(e.innerText),
          e.innerText.toUpperCase().indexOf(t) > -1
            ? (e.style.display = '')
            : (e.style.display = 'none');
      });
    }),
    {
      add: a,
      getAll: function() {
        return e;
      },
      addListItem: function(e) {
        let t = document.querySelector('.pokemon-list'),
          n = document.createElement('li'),
          i = document.createElement('button');
        n.classList.add('list-group-item'),
          n.classList.add('list-group-item-action'),
          (i.innerText = '#' + o + ' ' + p(e.name)),
          i.classList.add('btn', 'btn-danger', 'btn-outline-light'),
          i.classList.add('col-sm'),
          i.setAttribute('data-target', '#pokemonModal'),
          i.setAttribute('data-toggle', 'modal'),
          n.appendChild(i),
          t.appendChild(n),
          o++,
          i.addEventListener('click', function() {
            c(e);
          });
      },
      loadList: function() {
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            e.results.forEach(function(e) {
              a({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDetails: r,
      showDetails: c,
      showModal: s
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
