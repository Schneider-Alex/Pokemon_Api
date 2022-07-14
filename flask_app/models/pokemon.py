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

    @classmethod
    def validate_new_pokemon(cls,form):
        data={
            'pokemon_name' : form['pokemon_name'],
            'personal_name': form['personal_name'],
            'api_index' : form['api_index'],
            'user_id' : session['user_id']
        }
        query = """SELECT * FROM pokemons WHERE name =  %(pokemon_name)s"""
        results = connectToMySQL(cls.db).query_db(query, data)
        if results:
            print('!!!!!!!!!! FIRST CATCH BY USER',results[0])
            data["pokemon_id"] = results[0]['id']
            catch=Pokemon.new_catch_by_user(data)
            return print(catch)
        else:
            print('!!!!!! FIRST CATCH EVER')
            catch=Pokemon.first_catch_ever(data)
            return print(catch)

    @classmethod
    def first_catch_ever(cls,data):
        query="""
            INSERT INTO pokemons (name, api_index) VALUES (%(pokemon_name)s, %(api_index)s)
            """
        pokemon_id=connectToMySQL(cls.db).query_db(query, data)
        if pokemon_id:
            data["pokemon_id"] = pokemon_id
            print('!!!!!!!!!!!', data)
            catch=Pokemon.new_catch_by_user(data)
            return catch
        else:
            return print('ELSE STATEMENT PRINT')

    @classmethod
    def new_catch_by_user(cls,data):
        query="""
            INSERT INTO caught (user_id, pokemon_id, personal_name ) VALUES (%(user_id)s,%(pokemon_id)s,%(personal_name)s)
            """
        return connectToMySQL(cls.db).query_db(query, data)

    @classmethod
    def get_all_pokemon(cls):
        query="""
        SELECT id, name, api_index,caught.user_id FROM pokemons
        JOIN caught ON pokemon_id = pokemons.id
        ORDER BY pokemons.api_index;
        """
        results = connectToMySQL(cls.db).query_db(query)
        if len(results) < 1:
            flash('No Pokemon Caught Yet!')
            return []
        print(results)
        return results

    @classmethod
    def get_my_pokemon(cls):
        # query="""
        # SELECT name FROM pokemons
        # """
        # results = connectToMySQL(cls.db).query_db(query)
        # if len(results) < 1:
        #     return []
        # print(results)
        return [0]