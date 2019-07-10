//=============== API / ENDPOINT ===============//
//Primeiro passo: definir uma constante com a url da API a ser consumida, que será o endpoint
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

//=============== GET ELEMENTS ===============//
//Capturar os elementos HTML e criar 3 variáveis globais a serem usadas
// Get Elements

const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon-container'),
      erroMessage = getElement('.error');

var pokeName, //Nome ou numero passado na caixa de busca
    pokemon, //Responsavel por guardar os dados recebidos da API
    card; //Responsavel por receber o HTML

// console.log(searchInput);
// console.log(searchButton);
// console.log(container);
// console.log(erroMessage);


//=============== BUILD FUNCTIONS ===============//
//função para diminuir a escrita na hora de pegar os elementos HTML.
function getElement(element) {
    return document.querySelector(element);
}

//Usar o fetch para criar conexão com a API (uma alternativa seria o XMLHttpRequest())

//PRIMEIRO EXEMPLO

// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//   .then(response => response.json()) //recebe a resposta da requisição e, por função, transforma em json
//   .then(data => pokemon = datap)) //recebe essa resposta, e a imprime no console
//   .catch(err => console.log(err)); //só é executado caso aconteça algum erro
//No console agora terá informações sobre o pikachu

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemo
function requestPokeInfo(url, name) {
    fetch(url + name)
      .then(response => response.json())
      .then(data => {
        pokemon = data;
      })
      .catch(err => console.log(err));
  }
  
  console.log(pokemon); // Execute o console para verificar os dados no console

// Função responsavel por montar o HTML exibido na pagina
function createCard () {
    card = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">Name: ${pokemon.name}</h1>
          <h2 class="number">Nº ${pokemon.id}</h2>
          <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
          <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
          <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
          <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
      </div>`;
    return card;
  }
  
  // Função que faz a chamada das principais funções e inicia o app
  function startApp(pokeName) {
    requestPokeInfo(baseUrl, pokeName);
  
    setTimeout(function () {
        container.innerHTML = createCard();
    }, 2000);
  }
  
//=============== ADD EVENTS ===============//
  searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startApp(pokeName);
  });




