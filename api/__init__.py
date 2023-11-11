from flask import Flask, jsonify, request
from functools import wraps
from flask_cors import CORS

# Creamos la API a ejecutar:
app = Flask(__name__)
CORS(app)

#
app.config['SECRET_KEY'] = 'app_123'

# Conectamos las rutas de usuario
import api.routes.usuario
# Conectamos las rutas de clientes
import api.routes.cliente

