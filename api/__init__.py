from flask import Flask, jsonify, request, render_template
from functools import wraps
from flask_cors import CORS


# Creamos la API a ejecutar:
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'app_123'

@app.route('/')
def index():
    return render_template('public/index.html')


# Conectamos las rutas de usuario
import api.routes.usuario
# Conectamos las rutas de clientes
import api.routes.cliente
# Conectamos las rutas de datos_usuarios
import api.routes.datos_usuario
# Conectamos las rutas a la api raiz.
import api.routes.rutasHTML

