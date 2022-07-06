from inspect import _void
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_app import app
from flask_bcrypt import Bcrypt
from flask_app.models import pokemon

bcrypt = Bcrypt(app)


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# model the class after the friend table from our database


class User:
    db ='pokemon'
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def validate_user(cls,form):
        is_valid = True
        query = """SELECT * FROM users WHERE email =  %(email)s"""
        results = connectToMySQL(cls.db).query_db(query, form)
        if results:
            flash("email address already in use!")
            is_valid = False
        elif not EMAIL_REGEX.match(form['email']):
            flash("Invalid email address!")
            is_valid = False
        if len(form['first_name']) < 2:
            flash("First Name must be 3 Characters!")
            is_valid = False
        if len(form['last_name']) < 2:
            flash("Last Name must be 3 Characters!")
            is_valid = False
        if form['passwordcheck'] != form['password']:
            flash('passwords do not match!')
            is_valid = False
        return is_valid

    @classmethod
    def create_user(cls, form):
        print('************* create function running')
        data = {
                'first_name' : form['first_name'],
                'last_name' : form['last_name'],
                'email' : form['email'],
                'password' : bcrypt.generate_password_hash(form['password'])
            }
        print('******************Data parsed')
        query = """INSERT INTO users (first_name, last_name, email, password) 
        VALUES (%(first_name)s,%(last_name)s, %(email)s, %(password)s);"""
        user_id=connectToMySQL(cls.db).query_db(query,data)
        if user_id:
            return user_id
        return print("Nothing went through")

    @classmethod
    def login_user(cls,data):
        print(data)
        user = User.get_user_by_email(data)
        if user:
            print("***************",user.password)
            print("COMPARING", data['password'])
            if bcrypt.check_password_hash(user.password, data['password']):
                session['user_id'] = user.id
                session['first_name'] = user.first_name
                return session['user_id']
        flash('Invalid', 'login')
        return None

    @classmethod
    def get_user_by_email(cls, data):
        query= '''
        SELECT *
        FROM users
        WHERE email = %(email)s
        ;'''
        result =  connectToMySQL(cls.db).query_db(query, data)
        if result:
            result = cls(result[0])
        return result