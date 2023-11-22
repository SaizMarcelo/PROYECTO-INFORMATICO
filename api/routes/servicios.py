from api import app # importamos el objeto app
from api.models.servicios import Service # importamos clase service
from flask import jsonify, request
from api.utils import token_required, user_resource, service_resource


# CREATE
@app.route('/users/<int:user_id>/service', methods = ['POST'] )
@token_required
@user_resource
def create_service(user_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        new_service = Service.create_service(data)
        return jsonify( new_service ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

# READ

# Ruta: Get de service a traves del ID:
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['GET'] )
@token_required
@user_resource
@service_resource
def get_service_by_id(service_id, user_id):
    
    try:
        service = Service.get_service_by_id(service_id)
        return jsonify( service ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

# Consultar todos los serviceos
@app.route('/users/<int:user_id>/service', methods = ['GET'] )
@token_required
@user_resource
def get_all_services_by_user_id(user_id):
    
    try:
        services = Service.get_all_services_by_user_id(user_id)
        return jsonify( services ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400


# UPDATE
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['PUT'] )
@token_required
@user_resource
@service_resource
def update_service(user_id, service_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        service = Service.update_service(data, service_id)
        return jsonify( service ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400




# DELETE
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['DELETE'] )
@token_required
@user_resource
@service_resource
def remove_service(service_id, user_id):
    
    try:
        remove = Service.remove_service(service_id)
        return jsonify( remove ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400