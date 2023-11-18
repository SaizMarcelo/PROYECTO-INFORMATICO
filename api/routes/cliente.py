from api import app # importamos el objeto app
from api.models.cliente import Client # importamos clase cliente
from flask import request, jsonify
from api.utils import token_required, client_resource, user_resource
from api.db.db import mysql


# CREATE
@app.route('/users/<int:user_id>/client', methods = ['POST'] )
def create_client(user_id):

    name = request.get_json()["name"]
    surname = request.get_json()["surname"]
    email = request.get_json()["email"]
    address = request.get_json()["address"]
    phone_number = request.get_json()["phone_number"]
    
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO client (user_id, name, surname, email, address, phone_number, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s)', (user_id, name, surname, email, address, phone_number, True))
    mysql.connection.commit()
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
 
    id = row[0]
    return jsonify({"id": id, "user_id": user_id, "name": name, "surname": surname, "email": email, "address": address, "phone_number": phone_number})




# READ
# Ruta: Get de cliente a traves del ID:
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['GET'] )
@token_required
@user_resource
@client_resource
def get_client_by_id(user_id, client_id):
    """ Acceso a BBDD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM client WHERE id= %s AND user_id= %s AND visibility = %s', (client_id, user_id, True))
    data = cur.fetchall()

    if cur.rowcount > 0:
        objtClient = Client(data[0])
        return jsonify( objtClient.to_json() )
    return jsonify( {"messege": "id not found"}), 404

# RUTA: consulta todos los clientes de un usuario:
@app.route('/users/<int:user_id>/client', methods = ['GET'] )
@token_required
@user_resource
def get_all_clients_by_user_id(user_id):
    # Creamos un cursor:
    cur = mysql.connection.cursor()

    # Realizamos una consulta SQL:
    cur.execute('SELECT * FROM client WHERE user_id = %s AND visibility = %s', (user_id, True))
    
    # Esperamos mas de un registro:
    data = cur.fetchall()

    # Creamos una lista vacia:
    clientList = []
  
    # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto Cliente:
        objClient = Client(row)
        # Agregamos un elemento json a la lista:
        clientList.append(objClient.to_json())
    # Retornamos la lista de elementos json:
    return jsonify(clientList)



# UPDATE
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['PUT'] )
@token_required
@user_resource
@client_resource
def update_client(user_id, client_id):
    
    name = request.get_json()["name"]
    surname = request.get_json()["surname"]
    email = request.get_json()["email"]
    address = request.get_json()["address"]
    phone_number = request.get_json()["phone_number"]

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM client WHERE id=%s AND user_id=%s AND visibility = %s', (client_id, user_id, True))

    if cur.rowcount > 0:
        cur.execute('UPDATE client SET name = %s, surname = %s, email = %s, address = %s, phone_number = %s WHERE id = %s', (name, surname, email, address, phone_number, client_id))
    
        mysql.connection.commit()
        return jsonify({"id": client_id, "name": name, "surname": surname, "email": email, "address": address, "phone_number": phone_number})
    
    return jsonify( {"messege": "id not found"}), 404



# DELETE
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['DELETE'] )
@token_required
@user_resource
@client_resource
def remove_client(client_id, user_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM client WHERE id=%s AND user_id = %s AND visibility = %s', (client_id, user_id, True))
    if cur.rowcount > 0:
        cur.execute('UPDATE client SET visibility = %s WHERE id = %s', (False, client_id))
    
        mysql.connection.commit()
        return jsonify({"message": "deleted", "id": client_id})
    
    return jsonify( {"messege": "id not found"}), 404
