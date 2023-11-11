from api import app # importamos el objeto app
from api.models.cliente import Client # importamos clase cliente
from flask import jsonify
from api.utils import token_required, client_resource, user_resource
from api.db.db import mysql

# Ruta de controla:
"""@app.route('/test-cliente-route')
def test():
    return jsonify({"Ruta": "cliente-route"})"""

# Ruta: Get de cliente a traves del ID:
"""@app.route('/client/<int:id>', methods = ['GET'] )"""
@app.route('/user/<int:id_user>/client/<int:id_client>', methods = ['GET'] )
@token_required
@user_resource
@client_resource
def get_client_by_id(id_user, id_client):
    """ Acceso a BBDD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM client WHERE id={0}'.format(id_client))
    data = cur.fetchall()
    print(cur.rowcount)
    print(data)
    if cur.rowcount > 0:
        objtClient = Client(data[0])
        return jsonify( objtClient.to_json() )
    return jsonify( {"messege": "id not found"}), 404

# RUTA: consulta todos los clientes de un usuario:
@app.route('/user/<int:id_user>/client', methods = ['GET'] )
@token_required
@user_resource
def get_all_clients_by_user_id(id_user):
    # Creamos un cursor:
    cur = mysql.connection.cursor()
    # Realizamos una consulta SQL:
    cur.execute(f'SELECT * FROM client WHERE id_user = {id_user}')
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
