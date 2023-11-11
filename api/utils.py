from functools import wraps
from flask import request, jsonify
import jwt 
from api import app
from api.db.db import mysql

def token_required(func):
    @wraps(func)
    def decoraed(*args, **kwargs):
        print(kwargs)
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({"messege": "Falta Token Valido"}), 401
        
        user_id = None # inicializamos la cabecera en None.
        # Consultamos si la cabecera esta en la request.
        if 'user_id' in request.headers:
            # si esa cabecera existe a user_id le asignamos el contenido:
            user_id = request.headers['user-id']
        # Si no hay id ded usuario retornamos un mensaje:
        if not user_id:
            return jsonify({"message": "Falta el usuario"}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms = ['HS256'])
            token_id = data['id'] # obtenemos el 'id' que se encuentra encapsulado dentro del Token.
            # Si el usuario es distinto al token_id retornamos un mensaje:
            if int(user_id) != int(token_id):
                return jsonify({"message": "Error de id"})
        
        except Exception as e:
            print(e)
            return jsonify({"messege": str(e)}), 401

        return func(*args, **kwargs)
    return decoraed

# Control de RECURSOS RELACIONADOS CON CLIENTES:
def client_resource(func):
    @wraps(func)
    def decoraed(*args, **kwargs):
        print("Argumentos en client_resource:, ", kwargs)
        id_cliente = kwargs['id_client']
        # Definimos un cursor:
        cur = mysql.connection.cursor()
        # Ejecutamos una consulta: para obtener el id_usuario
        cur.execute(f'SELECT id_user FROM client WHERE id = {id_cliente}')
        # De los datos esperamos recibir solo 1: si el cliente existe data tendra un valor.
        data = cur.fetchone()
        # Controlamos el valor de Data:
        if data:
            """print(data)"""
            id_prop = data[0]
            # user_id que recibimos por cabecera:
            user_id = request.headers['user-id']
            # controlamos que sea el recurso del propietario quien consulta:
            if int(id_prop) != int(user_id):
                return jsonify({"message":"No tiene permiso para acceder a este recurso"}), 401
        return func(*args, **kwargs)
    return decoraed

# Control de RECURSOS RELACIONADOS CON USUARIOS:
def user_resource(func):
    @wraps(func)
    def decoraed(*args, **kwargs):
        print("Argumentos en user_resource:, ", kwargs)
        # Id del usuario utilizado en la ruta:
        id_user_route = kwargs['id_user']
        # Id que viene por cabecera de la request o consulta:
        user_id = request.headers['user-id']
        # controlamos que sea el recurso del propietario quien consulta:
        if int(id_user_route) != int(user_id):
            return jsonify({"message":"No tiene permiso para acceder a este recurso"}), 401
        return func(*args, **kwargs)
    return decoraed

