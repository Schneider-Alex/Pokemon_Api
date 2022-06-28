console.log("hello!")

async function getPokemonData(){
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    var pokemonData = await response.json();
    console.log(pokemonData)
    randomNum=getRandomInt(20)
    console.log(pokemonData.results[randomNum].url.sprites)
    var pokemonName = document.getElementById("myPokemonName")
    pokemonName.innerText=pokemonData.results[randomNum].name
    // document.getElementById("myPokemonImg").src='{{url_for("static",filename="assets/sprites/sprites/pokemon/'randomNum'.jpeg")}}'
    return pokemonData
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
