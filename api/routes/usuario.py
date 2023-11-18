from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.usuario import User
from api.utils import token_required, user_resource
import jwt
import datetime as dt


# Login
@app.route('/login', methods = ['POST'] )
def login():
    auth = request.authorization

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

# CREATE

@app.route('/signup', methods = ['POST'] )
def crate_user():

    username = request.get_json()["username"]
    password = request.get_json()["password"]
    name = request.get_json()["name"]
    surname = request.get_json()["surname"]
    email = request.get_json()["email"]
    address = request.get_json()["address"]
    phone_number = request.get_json()["phone_number"]
 

    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO users (username, password, name, surname, email, address, phone_number, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (username, password, name, surname, email, address, phone_number, True))
    mysql.connection.commit()
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
 
    id = row[0]
    return jsonify({"id": id, "username": username, "password": password, "name": name, "surname": surname, "email": email, "address": address, "phone_number": phone_number})

# READ
@app.route('/users/<int:id>', methods = ['GET'] )
def get_user_by_id(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE id=%s AND visibility =%s', (id, True))
    data = cur.fetchall()
    if cur.rowcount > 0:
        objUser = User(data[0])
        if objUser._visibility:

            return jsonify(objUser.to_json())
    return jsonify( {"messege": "id not found"}), 404

@app.route('/users', methods = ['GET'] )
def get_all_user():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users')
    data = cur.fetchall()
    usersList = []
    for row in data:
        objUser = User(row)
        if objUser._visibility:
            usersList.append(objUser.to_json())
    return jsonify(usersList)

# UPDATE
@app.route('/users/<int:id>', methods = ['PUT'] )
@token_required
@user_resource
def update_user(id):
    
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    name = request.get_json()["name"]
    surname = request.get_json()["surname"]
    email = request.get_json()["email"]
    address = request.get_json()["address"]
    phone_number = request.get_json()["phone_number"]

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE id=%s', (id,))
    if cur.rowcount > 0:
        cur.execute('UPDATE users SET username = %s, password = %s, name = %s, surname = %s, email = %s, address = %s, phone_number = %s  WHERE id=%s', (username, password, name, surname, email, address, phone_number, id))
        
        mysql.connection.commit()
        return jsonify({"id": id, "username": username, "password": password, "name": name, "surname": surname, "email": email, "address": address, "phone_number": phone_number})
    return jsonify( {"messege": "id not found"}), 404

# DELETE
@app.route('/users/<int:id>', methods = ['DELETE'] )
@token_required
@user_resource
def remove_user(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE id=%s AND visibility =%s', (id, True))
    if cur.rowcount > 0:
        cur.execute('UPDATE users SET visibility=%s WHERE id=%s', (False, id))
        mysql.connection.commit()
        return jsonify({"message": "deleted", "id": id})
    return jsonify( {"messege": "id not found"}), 404