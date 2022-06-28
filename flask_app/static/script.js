console.log("hello!")

async function getPokemonData(){
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    var pokemonData = await response.json();
    console.log(pokemonData);
    var randomNum=getRandomInt(20);
    document.getElementById("myPokemonName").innerText=pokemonData.results[randomNum].name;
    var imgNum = randomNum+1
    document.getElementById("myPokemonImg").src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNum}.png`
    return pokemonData
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
