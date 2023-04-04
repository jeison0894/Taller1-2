function cambiarPagina(pagina) {
  const secciones = document.querySelectorAll(".section");
  secciones.forEach(seccion => seccion.style.display = "none");

  const seccion = document.querySelector(`#${pagina}`);
  seccion.style.display = "block";
}

const enlaces = document.querySelectorAll(".nav__link");
enlaces.forEach(enlace => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();
    const pagina = e.target.getAttribute("href").slice(2);

    cambiarPagina(pagina);
  });
});

const handleApiCallBtn = document.querySelector('.fetch__button');

function handleFetchButtonClick() {
  fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(data => {
      const pokemonesList = data.results.slice(0, 6)
      const pokemonesContainer = document.querySelector('.fetch__pokemonesContainer');

      pokemonesList.forEach(pokemon => {
        const pokemonContainer = document.createElement("div")
        const pokemonImg = document.createElement('img');
        const pokemonsH3 = document.createElement("h3")
        pokemonsH3.textContent = `${pokemon.name}`
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        pokemonContainer.appendChild(pokemonImg);
        pokemonContainer.appendChild(pokemonsH3);
        pokemonesContainer.appendChild(pokemonContainer)
      })

      handleApiCallBtn.removeEventListener('click', handleFetchButtonClick);
    });
}

handleApiCallBtn.addEventListener('click', handleFetchButtonClick);
