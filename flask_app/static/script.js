const selectionButtons = document.querySelectorAll('[data-selection]')
const SELECTIONS = [
    // this is a list of dictionaries for each type for the rock paper scissors game
    {
        name: 'water',
        emoji: '💧',
        beats: 'fire'
    },
    {
        name: 'fire',
        emoji: '🔥',
        beats: 'grass'
    },
    {
        name: 'grass',
        emoji: '🌱',
        beats: 'water'
    }
]

async function getPokemonData() {
    // first clearing results from previous pokemon
    document.getElementById('results').innerHTML=""
    // this is a function for retreiving pokemon name and image from pokemon API
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    var pokemonData = await response.json();
    
    // window.pokemonName=pokemonData.results[randomNum].name;
    var randomNum = getRandomInt(20);
    // below lines are simply capatilizing name of pokmeon
    var name = pokemonData.results[randomNum].name
    var first = name.charAt(0).toUpperCase()
    name = name.slice(1)
    name = first + name
    console.log(name)
    window.pokemonName=name
    window.pokemonApiIndex=randomNum
    document.getElementById("myPokemonName").innerText = window.pokemonName
    var imgNum = randomNum + 1
    document.getElementById("myPokemonImg").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNum}.png`
    document.getElementById("selections").style="display:flex"
    return pokemonData
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


selectionButtons.forEach(selectionButton => {
    // adding event listener to element buttons on click
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection){
    // actual game function
    const computerSelection=randomSelection()
    // const yourWinner = isWinner(selection,computerSelection)
    // const computerWinner = isWinner(computerSelection, selection)
    console.log(selection.emoji)
    console.log(computerSelection.emoji)
    elementResults(selection,computerSelection)
    // console.log(yourWinner)
    // addSelectionResult(computerSelection, computerWinner)
    // addSelectionResult(selection, yourWinner)
}
function randomSelection(){
    // random selector for computers selection
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}
function elementResults(selection,opponentSelection){
    if (selection.name===opponentSelection.name){
        tieFunction(selection,opponentSelection)
        return console.log('Tie!')
    } 
    if (selection.beats === opponentSelection.name){ 
        winFunction(selection,opponentSelection)
        return console.log('You Win')
    }
    if (selection.name === opponentSelection.beats){ 
        loseFunction(selection,opponentSelection)
        return console.log('You Lose')
    }
}

function tieFunction(selection,opponentSelection){
    
    console.log(window.pokemonName)
    document.getElementById('results').innerHTML=`<p>${window.pokemonName} has chosen ${opponentSelection.name} as well! The battle continues!</p>`
}
function winFunction(selection,opponentSelection){

    document.getElementById('selections').style="display:none"
    document.getElementById('results').innerHTML=`
    <h3>You won!</h3>
    <p>You chose ${selection.name}, which is super effective against ${window.pokemonName}'s choice, ${opponentSelection.name}! Great job, let's add them to the Pokedex!</p>`
    document.getElementById('myPokemonImg').src=""
    document.getElementById('caughtPokeball').innerHTML=`<i class="nes-pokeball"></i>`
    document.getElementById('new_pokemon_form').innerHTML=`<form action="/pokedex/new/pokemon" method="post">
    <Label for="name">Name your ${window.pokemonName}<input type="text" name="personal_name" minlength="2" required></Label>
    <input type="hidden" name="pokemon_name" value="${window.pokemonName}">
    <input type="hidden" name="api_index" value="${window.pokemonApiIndex}"/>
    <input type="submit" value="Add to Pokedex">
</form>`

}
function loseFunction(selection,opponentSelection){
    document.getElementById('selections').style="display:none"
    document.getElementById('results').innerHTML=`
    <h3>You Lost!</h3>
    <p>${window.pokemonName} chose ${opponentSelection.name} which is super effective against your ${selection.name}! ${window.pokemonName} got away!</p>`

}
// function isWinner(selection,opponentSelection){
//     // determing if user or computer won game
//     return selection.beats === opponentSelection.name
// }











// THE BELOW FUNCTIONS ARE FOR CREATING ELEMENTS FOR LOGGING IN
function returningTrainer() {
    return document.getElementById("login_form").innerHTML = `
    <form action="/login/user" method="post">
        <label for="name_field">Email:</label>
        <input type="text" id="name_field" class="nes-input" required name="email" placeholder="emailed@e.com">
        <label for="name_field">Password:</label>
        <input type="password" id="name_field" class="nes-input" name="password" placeholder="Password1?" required>
        <input type="submit" name="submit" class="btn btn1" value="Login" />
    </form>`
}
function newTrainer() {
    return document.getElementById("login_form").innerHTML = `<form action="/create/user" method="post">
    <Label for="first_name">First Name:<input class="nes-input" type="text" name="first_name" required></Label>
    <Label for="last_name">Last Name:<input class="nes-input" type="text" name="last_name" required></Label>
    <Label for="email">Email adress:<input class="nes-input" type="text" name="email" required></Label>
    <Label for="password">Password:<input class="nes-input" type="password" name="password" required></Label>
    <Label for="passwordcheck">Confirm Password:<input class="nes-input" type="password" name="passwordcheck" required></Label>
    <input type="submit"value="Create User">
</form>`
}