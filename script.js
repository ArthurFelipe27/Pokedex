let pokemonImages = [];
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
  flying: 'Voador',
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
  //API do Pokemon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //API do Sexo
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const speciesData = await speciesResponse.json();
  
  let sexo;
  switch (speciesData.gender_rate) {
    case -1:
      sexo = 'Sem gênero';
      break;
    case 0:
      sexo = 'Macho';
      break;
    case 8:
      sexo = 'Fêmea';
      break;
    default:
      sexo = 'Macho e Fêmea';
      break;
  }

  if (response.ok) {
    const data = await response.json();

    const pokemonTraduzidos = traduzirTipos(data.types.map(t => t.type.name));

    
    pokemonImages = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ].filter(img => img); 

    
    const animation = data.sprites.versions["generation-v"]['black-white']?.animated?.front_default;
    if (animation) {
      pokemonImages.push(animation); 
    }

    document.getElementById('pokemonInfo').innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>

      <div id="carrosselPokemon" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${pokemonImages.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100" alt="${data.name}">
            </div>`).join('')}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carrosselPokemon" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carrosselPokemon" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Próximo</span>
        </button>
      </div>

      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${pokemonTraduzidos.join(', ')}</p>
      <p><strong>Sexo:</strong> ${sexo}</p>
    `;
  } else {
    document.getElementById('pokemonInfo').innerHTML = '<p>Pokémon não encontrado.</p>';
  }
}
