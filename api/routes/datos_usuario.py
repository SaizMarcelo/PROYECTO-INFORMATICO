from api import app # importamos el objeto app
from api.models.datos_usuarios import DatosUsuario # importamos clase cliente
from flask import jsonify
from api.utils import token_required, client_resource, user_resource
from api.db.db import mysql

# RUTA: consulta todos los clientes de un usuario:
# En la ruta respetar en nombre en la BBDD.
@app.route('/user/<int:id_user>/datos_usuarios', methods = ['GET'] )
@token_required
@user_resource
def get_all_datosUsuarios_by_user_id(id_user):
    # Creamos un cursor:
    cur = mysql.connection.cursor()
    # Realizamos una consulta SQL:
    cur.execute(f'SELECT * FROM datos_usuarios WHERE kf_id = {id_user}')
    # Esperamos mas de un registro:
    data = cur.fetchall()
    # Creamos una lista vacia:
    clientList = []
    print('---- Control ----')
    # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto Cliente:
        objClient = DatosUsuario(row)
        # Agregamos un elemento json a la lista:
        clientList.append(objClient.to_json())
    # Retornamos la lista de elementos json:
    return jsonify(clientList)