from flask import Flask, jsonify, request, render_template
from functools import wraps
from flask_cors import CORS
from api import app


# Redireccionamiento: DATOS USUARIO
@app.route('/usuarioForm0001')
def usuarioForm0001():
    return render_template('public/usuarioForm0001.html')

# Redireccionamiento: INICIO
@app.route('/inicioForm0001')
def inicioForm0001():
    return render_template('public/inicioForm0001.html')



# Conectamos las rutas de usuario
import api.routes.usuario
# Conectamos las rutas de clientes
import api.routes.cliente
# Conectamos las rutas de datos_usuarios
import api.routes.datos_usuario
