from api import app
from flask import request, jsonify
from api.db.db import mysql
import jwt
import datetime as dt

@app.route('/login', methods = ['POST'] )
def login():
    auth = request.authorization
    print(auth)

    """ Control: existen valores para la autenticacion?"""
    if not auth or not auth.username or not auth.password:
        return jsonify({"Messenge": "Login No Autorizado"}), 401 # existen librerias que facilitan el manejo de errores

    """ Control: existen y coincide el usuario en la BD?"""
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (auth.username, auth.password))
    # Esperamos recibir una fila: devuelve 1ero en fila osea 1.
    row = cur.fetchone()

    # si la consulta no devuelve filas:
    if not row:
        return jsonify({"Messenge": "Login No Autorizado"}), 401 # existen librerias que facilitan el manejo de errores

    """ El usuario existe en la BD y coincide su contrseña"""
    # Creamos una variable codificada:
    token = jwt.encode({
        'id': row[0],
        'exp': dt.datetime.utcnow() + dt.timedelta(minutes=100)   # tiempo de exporar el password. Tiempo para que el usurio vuelva a iniciar sesion. 
    }, app.config['SECRET_KEY'])
    
    return jsonify({"Token": token, "Username": auth.username, "id": row[0]})