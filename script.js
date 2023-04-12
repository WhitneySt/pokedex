//1. Obtener pokemons y pintarlos en el footer

//---------------------------Variables y constantes---------------------------------------------
let pokemons = [];
const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=100";
const pokemonsContainer = document.getElementById("pokemonsContainer");
const detailsPokemon = document.querySelector(".main-container");

//-------------------------------------Funciones------------------------------------------------------
const getInfoPokemons = async () => {
  try {
    const pokemons = [];
    const { data } = await axios.get(URL_API);
    console.log(data);
    for (const pokemon of data.results) {
      const url = pokemon.url;
      const { data: response } = await axios.get(url);
      const pokemonOnly = {
        id: response.id,
        name: response.name,
        abilities: response.abilities.map((item) => item.ability.name),
        types: response.types.map((item) => item.type.name),
        level: response.base_experience,
        image: response.sprites.other.dream_world.front_default,
        height: response.height,
        weight: response.weight,
      };
      pokemons.push(pokemonOnly);
    }
    console.log(pokemons);
    return pokemons;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const showPokemonsFooter = (container, pokemonsList) => {
  container.innerHTML = "";
  pokemonsList.forEach((pokemon) => {
    container.innerHTML += `
        <figure>
                <img class="pokemonFooter" name=${pokemon.id} src=${pokemon.image} alt=${pokemon.name}>
            </figure>
        `;
  });
};

//Función que nos permita obtener un listado de 4 pokemons aleatorios
const getPokemonsRandom = (pokemonsList) => {
  let cantidadPokemons = 4;
  const pokemonsRandom = [];

  while (cantidadPokemons) {
    const randomId = Math.floor(Math.random() * 100);
    const pokemon = pokemonsList.find((item) => item.id === randomId);
    if (pokemon && !pokemonsRandom.find((item) => item.id === pokemon.id)) {
      pokemonsRandom.push(pokemon);
      cantidadPokemons--;
    }
  }

  //   for (let index = 0; index < cantidadPokemons; index++) {
  //       const randomId = Math.floor(Math.random() * 100);
  //       const pokemon = pokemonsList.find(item => item.id === randomId);
  //       if (pokemon) {
  //           pokemonsRandom.push(pokemon);
  //       }
  //     }
  console.log(pokemonsRandom);
  return pokemonsRandom;
};

//2. Mostar la información detalada  del pokemón seleccionado
const findPokemonRandom = (pokemonsList) => {
  const randomId = Math.floor(Math.random() * 100);
  const pokemon = pokemonsList.find((item) => item.id === randomId);
  return pokemon;
};

const showDetailsPokemon = (container, pokemon) => {
  container.innerHTML = `
    <section class="charizard-container">
            <div class="title">
                <figure>
                    <img src="https://static.vecteezy.com/system/resources/previews/001/188/706/original/flame-png.png" alt="llama">
                </figure>
                <h2>${pokemon.name}</h2>
            </div>
            <figure class="image-charizard">
                <img src=${pokemon.image} alt=${pokemon.name}>
            </figure>
        </section>
        <article class="info-pokemon">
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">No.</span>
                    <span class="info-text">${pokemon.id}</span>
                </div>
                <div class="row-item">
                    <span class="title-info">LEVEL</span>
                    <span class="info-text">${pokemon.level}</span>
                </div>
            </div>
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">TYPE</span>
                    <span class="info-text">${pokemon.types[0]}</span>
                </div>
                <div class="row-item">
                    <span class="title-info">HABILITY</span>
                    <span class="info-text">${pokemon.abilities[0]}</span>
                </div>
            </div>
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">HEIGHT</span>
                    <span class="info-text">${pokemon.height} m</span>
                </div>
                <div class="row-item">
                    <span class="title-info">WEIGHT</span>
                    <span class="info-text">${pokemon.weight} Kg</span>
                </div>
            </div>
        </article>
    `;
};

//----------------------------Ejecución----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  pokemons = await getInfoPokemons();
  const pokemonsRandom = getPokemonsRandom(pokemons);
  const pokemonShow = findPokemonRandom(pokemons);
  showDetailsPokemon(detailsPokemon, pokemonShow);
  showPokemonsFooter(pokemonsContainer, pokemonsRandom);
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("pokemonFooter")) {
        const idPokemon = e.target.getAttribute('name');
        const pokemonSelected = pokemons.find(item => item.id == idPokemon);
        showDetailsPokemon(detailsPokemon, pokemonSelected);
    }
})
