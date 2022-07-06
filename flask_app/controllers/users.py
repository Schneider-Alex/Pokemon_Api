from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, jsonify
from flask_app.models import user


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/create/user', methods=["POST"])
def create_user():
    if user.User.validate_user(request.form):
        user.User.create_user(request.form)
        user.User.login_user(request.form)
        print(session)
        return redirect('/choice')
    return redirect('/')

@app.route('/login/user', methods=["POST"])
def login_user():
    if user.User.login_user(request.form):
        return redirect('/choice')
    return redirect('/')

@app.route('/search/pokemon')
def search_page():
    return render_template("search.html")

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/choice')
def choice_page():
    return render_template('choice.html')

@app.route('/pokedex')
def  pokedex_page():
    return  render_template('pokedex.html')