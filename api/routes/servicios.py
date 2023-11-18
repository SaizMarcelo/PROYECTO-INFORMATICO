from api import app # importamos el objeto app
from api.models.servicios import Service # importamos clase service
from flask import jsonify, request
from api.utils import token_required, user_resource, service_resource
from api.db.db import mysql

# CREATE
@app.route('/users/<int:user_id>/service', methods = ['POST'] )
@token_required
@user_resource
def crate_service(user_id):

    name = request.get_json()["name"]
    hour_price = request.get_json()["hour_price"]
    services_contracted = request.get_json()["services_contracted"]
    
    
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO service (user_id, name, hour_price, services_contracted, visibility) VALUES (%s, %s, %s, %s, %s)', (user_id, name, hour_price, services_contracted, True))
    mysql.connection.commit()
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
 
    id = row[0]
    return jsonify({"id": id, "user_id": user_id, "name": name, "hour_price": hour_price, "services_contracted": services_contracted})



# READ

# Ruta: Get de service a traves del ID:
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['GET'] )
@token_required
@user_resource
@service_resource
def get_service_by_id(user_id, service_id):
    """ Acceso a BBDD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM service WHERE id=%s AND user_id=%s AND visibility = %s', (service_id, user_id, True))
    data = cur.fetchall()
    
    if cur.rowcount > 0:
        objtservice = Service(data[0])
        return jsonify( objtservice.to_json() )
    return jsonify( {"messege": "id not found"}), 404

# Consultar todos los serviceos
@app.route('/users/<int:user_id>/service', methods = ['GET'] )
@token_required
@user_resource
def get_all_services_by_user_id(user_id):
    # Creamos un cursor:
    cur = mysql.connection.cursor()

    # Realizamos una consulta SQL:
    cur.execute('SELECT * FROM service WHERE user_id = %s AND visibility = %s', (user_id, True))

    # Esperamos mas de un registro:
    data = cur.fetchall()

    # Creamos una lista vacia:
    serviceList = []
   
    # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto servicee:
        objservice = Service(row)
        # Agregamos un elemento json a la lista:
        serviceList.append(objservice.to_json())
    # Retornamos la lista de elementos json:
    return jsonify(serviceList)


# UPDATE
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['PUT'] )
@token_required
@user_resource
@service_resource
def update_service(user_id, service_id):
    
    name = request.get_json()["name"]
    hour_price = request.get_json()["hour_price"]
    services_contracted = request.get_json()["services_contracted"]
    

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM service WHERE id=%s AND user_id=%s AND visibility = %s', (service_id, user_id, True))

    if cur.rowcount > 0:
        cur.execute('UPDATE service SET name = %s, hour_price = %s, services_contracted = %s WHERE id=%s', (name, hour_price, services_contracted, service_id))
    
        mysql.connection.commit()
        return jsonify({"id": service_id, "name": name, "hour_price": hour_price, "services_contracted": services_contracted})
    
    return jsonify( {"messege": "id not found"}), 404




# DELETE
@app.route('/users/<int:user_id>/service/<int:service_id>', methods = ['DELETE'] )
@token_required
@user_resource
@service_resource
def remove_service(service_id, user_id):
    cur = mysql.connection.cursor()
    # Consultamos si esta visible el servicio y existe
    cur.execute('SELECT * FROM service WHERE id=%s AND user_id = %s AND visibility =%s', (service_id, user_id, True))
    
    # Si existe el servicio lo "ELIMINAMOS" (cambio de visibilidad)
    if cur.rowcount > 0:
        cur.execute('UPDATE service SET visibility=%s WHERE id=%s', (False, service_id))
        mysql.connection.commit()
        return jsonify({"message": "deleted", "id": service_id})

    
    return jsonify( {"messege": "id not found"}), 404
