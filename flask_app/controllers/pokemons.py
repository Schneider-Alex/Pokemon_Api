from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, jsonify

@app.route('/')
def home():
    return render_template("index.html")