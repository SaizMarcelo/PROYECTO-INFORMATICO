from flask import Flask, jsonify, request, render_template
from functools import wraps
from flask_cors import CORS
from api import app
from api.utils import token_required, client_resource, user_resource
from api.models.cliente import Client # importamos clase cliente
from api.db.db import mysql

# Redireccionamiento: DATOS USUARIO
@app.route('/usuarioForm0001')
def usuarioForm0001():
    return render_template('public/usuarioForm0001.html')

# Redireccionamiento: INICIO
@app.route('/inicioForm0001')
def inicioForm0001():
    return render_template('public/inicioForm0001.html')

# Redireccionamiento: BIEN VENIDO
@app.route('/dashboardForm0001')
def dashboardForm0001():
    return render_template('public/dashboardForm0001.html')
