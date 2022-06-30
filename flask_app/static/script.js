console.log("hello!")

async function getPokemonData() {
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    var pokemonData = await response.json();
    console.log(pokemonData);
    var randomNum = getRandomInt(20);
    document.getElementById("myPokemonName").innerText = pokemonData.results[randomNum].name;
    var imgNum = randomNum + 1
    document.getElementById("myPokemonImg").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNum}.png`
    return pokemonData
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function returningTrainer() {

    return document.getElementById("login_form").innerHTML = `
    <form action="/login/user" method="post"> 
        <Label for="email">Email adress:<input type="text" name="email" placeholder="emailed@e.com" required></Label>
        <Label for="password">Password:<input type="password" name="password" placeholder="Password1?" required></Label>
        <input type="submit" name="submit" class="btn btn1" />
    </form>`
}

function newTrainer() {
    return document.getElementById("login_form").innerHTML = `<form action="/create/user" method="post">
    <Label for="first_name">First Name:<input type="text" name="first_name" required></Label>
    <Label for="last_name">Last Name:<input type="text" name="last_name" required></Label>
    <Label for="email">Email adress:<input type="text" name="email" required></Label>
    <Label for="password">Password:<input type="password" name="password" required></Label>
    <Label for="passwordcheck">Confirm Password:<input type="password" name="passwordcheck" required></Label>
    <input type="submit"value="Create User">
</form>`
}