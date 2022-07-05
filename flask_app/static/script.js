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
    // this is a function for retreiving pokemon name and image from pokemon API
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    var pokemonData = await response.json();
    
    // window.pokemonName=pokemonData.results[randomNum].name;
    var randomNum = getRandomInt(20);
    document.getElementById("myPokemonName").innerText = pokemonData.results[randomNum].name;
    // below lines are simply capatilizing name of pokmeon
    var name = pokemonData.results[randomNum].name
    var first = name.charAt(0).toUpperCase()
    name = name.slice(1)
    name = first + name
    console.log(name)
    window.pokemonName=pokemonData.results[randomNum].name;
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

}
function loseFunction(selection,opponentSelection){

}
// function isWinner(selection,opponentSelection){
//     // determing if user or computer won game
//     return selection.beats === opponentSelection.name
// }











// THE BELOW FUNCTIONS ARE FOR CREATING ELEMENTS FOR LOGGING IN
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