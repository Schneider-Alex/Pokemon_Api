from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, jsonify
from flask_app.models import pokemon

@app.route('/pokedex/new/pokemon',methods=['POST'])
def add_pokemon_to_pokedex():
    pokemon.Pokemon.validate_new_pokemon(request.form)
    return redirect('/search/pokemon')

@app.route('/pokedex/display', methods=["POST"])
def pokedex_selection():
    # may end up deleting this entire function, trying on this branch
    if request.form['answer'] == 'my':
        pokemon_list=pokemon.Pokemon.get_my_pokemon()
        print("my")
    if request.form['answer'] == 'all':
        pokemon_list=pokemon.Pokemon.get_all_pokemon()
        print("all")
    print(pokemon_list)
    return render_template("pokedex.html", pokemon_list=pokemon_list)
