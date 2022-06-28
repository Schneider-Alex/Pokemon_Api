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
        return redirect('/')
    print('FUNCTIONS DID NOT RETURN POSITIVE!!!!!!!!!!!!!!')
    return redirect('/')