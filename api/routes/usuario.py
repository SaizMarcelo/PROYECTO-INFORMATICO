from api import app
from flask import request, jsonify
from api.db.db import mysql
from api.models.usuario import User
from api.utils import token_required, user_resource



# Login
@app.route('/login', methods = ['POST'] )
def login():
    auth = request.authorization
    try:
        log = User.login(auth)
        return jsonify(log)
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

    
# CREATE

@app.route('/signup', methods = ['POST'] )
def crate_user():
    data = request.get_json()
    try:
        new_user = User.create_user(data)
        return jsonify( new_user ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

# READ
@app.route('/users/<int:id>', methods = ['GET'] )
def get_user_by_id(id):
    try:
        user = User.get_user_by_id(id)
        return jsonify( user ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/users', methods = ['GET'] )
def get_all_user():
    try:
        user = User.get_all_users()
        return jsonify( user ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

# UPDATE
@app.route('/users/<int:id>', methods = ['PUT'] )
@token_required
@user_resource
def update_user(id):
    
    data = request.get_json()
    data["user_id"] = id
    try:
        user = User.update_user(data)
        return jsonify( user ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
    

# DELETE
@app.route('/users/<int:id>', methods = ['DELETE'] )
@token_required
@user_resource
def remove_user(id):
    try:
        delete = User.delete_user(id)
        return delete
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400