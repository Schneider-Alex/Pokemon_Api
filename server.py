from flask_app import app
from flask_app.controllers import pokemons,users
#Remember to import all CONTROLLERS!!!

if __name__ == "__main__":
    app.run(debug=True)
