from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, jsonify
from flask_app.models import pokemon

@app.route('/pokedex/new/pokemon',methods=['POST'])
def add_pokemon_to_pokedex():
    print(request.form)
    print('Pokemon Added')
    return redirect('/search/pokemon')

