from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_app import app
from flask_bcrypt import Bcrypt
from flask_app.models import exercise

bcrypt = Bcrypt(app)


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

# model the class after the friend table from our database
class User:
    def __init__( self , data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data ['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @staticmethod
    def validate_user(form):
        is_valid=True
        query = """SELECT * FROM users WHERE email =  %(email)s"""
        results = connectToMySQL('exercise').query_db(query, form)
        if results:
            flash("email address already in use!")
            is_valid = False
        elif not EMAIL_REGEX.match(form['email']): 
            flash("Invalid email address!")
            is_valid = False
        if len(form['first_name']) < 2:
            flash("First Name must be 3 Characters!")
            is_valid = False
        if len(form['last_name']) <  2:
            flash("Last Name must be 3 Characters!")
            is_valid = False
        if form['passwordcheck'] != form['password']:
            flash('passwords do not match!')
            is_valid = False
        return is_valid