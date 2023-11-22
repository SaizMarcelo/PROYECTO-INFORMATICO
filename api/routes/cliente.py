from api import app # importamos el objeto app
from api.models.cliente import Client # importamos clase cliente
from flask import request, jsonify
from api.utils import token_required, client_resource, user_resource


# CREATE
@app.route('/users/<int:user_id>/client', methods = ['POST'] )
@token_required
@user_resource
def create_client(user_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        new_client = Client.create_client(data)
        return jsonify( new_client ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
    

# READ
# Ruta: Get de cliente a traves del ID:
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['GET'] )
@token_required
@user_resource
@client_resource
def get_client_by_id(client_id, user_id):
    
    try:
        client = Client.get_client_by_id(client_id)
        return jsonify( client ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
   

# RUTA: consulta todos los clientes de un usuario:
@app.route('/users/<int:user_id>/client', methods = ['GET'] )
@token_required
@user_resource
def get_all_clients_by_user_id(user_id):
    try:
        clients = Client.get_all_client(user_id)
        return jsonify( clients ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400



# UPDATE
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['PUT'] )
@token_required
@user_resource
@client_resource
def update_client(client_id, user_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        client = Client.update_client_by_id(client_id, data)
        return jsonify( client ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400



# DELETE
@app.route('/users/<int:user_id>/client/<int:client_id>', methods = ['DELETE'] )
@token_required
@user_resource
@client_resource
def remove_client(client_id, user_id):
    try:
        client = Client.remove_client_by_id(client_id)
        return jsonify( client ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
