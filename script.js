let pokemonImages = [];
let corredorDeImagens = 0;
const tipoPokemon = {
  electric: 'Elétrico',
  psychic: 'Psíquico',
  grass: 'Grama',
  fire: 'Fogo',
  water: 'Água',
  bug: 'Inseto',
  normal: 'Normal',
  fighting: 'Lutador',
  ghost: 'Fantasma',
  fairy: 'Fada',
  dragon: 'Dragão',
  poison: 'Venenoso',
  flying: 'Voando',
  ice: 'Gelo',
  steel: 'Aço',
  dark: 'Sombrio',
  ground: 'Terrestre',
  rock: 'Pedra',
  hero: 'Herói',
};

function traduzirTipos(types) {
  return types.map(type => tipoPokemon[type] || type);
}

async function getPokemon() {
  const id = document.getElementById('pokemonId').value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (response.ok) {
    const data = await response.json();

  const pokemonTrduzidos = traduzirTipos(data.types.map(t => t.type.name));

    pokemonImages = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    corredorDeImagens = 0;

    document.getElementById('pokemonInfo').innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img id="pokemonImage" src="${pokemonImages[corredorDeImagens]}" alt="${data.name}">
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${pokemonTrduzidos.join(', ')}</p>
    `;
  } else {
    document.getElementById('pokemonInfo').innerHTML = '<p>Pokémon não encontrado.</p>';
  }
}

function passarImagem(direcao) {
  if (direcao == 'proxima') {
    corredorDeImagens = (corredorDeImagens + 1) % pokemonImages.length;
  } else if (direcao == 'anterior') {
    corredorDeImagens = (corredorDeImagens - 1 + pokemonImages.length) % pokemonImages.length; 
  }

  const pokemonImage = document.getElementById('pokemonImage');
  pokemonImage.src = pokemonImages[corredorDeImagens];
  
}
