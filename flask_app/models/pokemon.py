from inspect import _void
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_app import app
from flask_bcrypt import Bcrypt
from flask_app.models import user

class Pokemon:
    db ='pokemon'
    def __init__(self, data):
        self.id = data['id']
        self.name = data['first_name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @staticmethod
    def validate_new_pokemon(form):
        query = """SELECT * FROM pokemon WHERE name =  %(pokemon_name)s"""
        results = connectToMySQL('exercise').query_db(query, form)
        return True