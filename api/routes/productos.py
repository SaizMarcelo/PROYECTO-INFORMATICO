from api import app # importamos el objeto app
from api.models.productos import Product # importamos clase producto
from flask import jsonify, request
from api.utils import token_required, user_resource, product_resource
from api.db.db import mysql



# CREATE
@app.route('/users/<int:user_id>/product', methods = ['POST'] )
@token_required
@user_resource
def crate_product(user_id):

    name = request.get_json()["name"]
    unitary_price = request.get_json()["unitary_price"]
    units_stored = request.get_json()["units_stored"]
    units_selled = request.get_json()["units_selled"]
    
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO product (user_id, name, unitary_price, units_stored, units_selled, visibility) VALUES (%s, %s, %s, %s, %s, %s)', (user_id, name, unitary_price, units_stored, units_selled, True))
    mysql.connection.commit()
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
 
    id = row[0]
    return jsonify({"id": id, "user_id": user_id, "name": name, "unitary_price": unitary_price, "units_stored": units_stored, "units_selled": units_selled})



# READ

# Ruta: Get de producte a traves del ID:
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['GET'] )
@token_required
@user_resource
@product_resource
def get_product_by_id(user_id, product_id):
    """ Acceso a BBDD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM product WHERE id=%s AND user_id=%s AND visibility = %s', (product_id, user_id, True))
    data = cur.fetchall()
    
    if cur.rowcount > 0:
        objProduct = Product(data[0])
        return jsonify( objProduct.to_json() )
    
    return jsonify( {"messege": "id not found"}), 404

# Consultar todos los productos
@app.route('/users/<int:user_id>/product', methods = ['GET'] )
@token_required
@user_resource
def get_all_products_by_user_id(user_id):
    # Creamos un cursor:
    cur = mysql.connection.cursor()

    # Realizamos una consulta SQL:
    cur.execute('SELECT * FROM product WHERE user_id = %s AND visibility = %s', (user_id, True))

    # Esperamos mas de un registro:
    data = cur.fetchall()

    # Creamos una lista vacia:
    productList = []
   
    # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto producto:
        objProduct = Product(row)

        # Agregamos un elemento json a la lista:
        productList.append(objProduct.to_json())
    # Retornamos la lista de elementos json:
    return jsonify(productList)


# UPDATE
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['PUT'] )
@token_required
@user_resource
@product_resource
def update_product(user_id, product_id):
    
    name = request.get_json()["name"]
    unitary_price = request.get_json()["unitary_price"]
    units_stored = request.get_json()["units_stored"]
    units_selled = request.get_json()["units_selled"]

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM product WHERE id=%s AND user_id=%s AND visibility = %s', (product_id, user_id, True))

    if cur.rowcount > 0:
        cur.execute('UPDATE product SET name = %s, unitary_price = %s, units_stored = %s, units_selled = %s WHERE id=%s', (name, unitary_price, units_stored, units_selled, product_id))
    
        mysql.connection.commit()
        return jsonify({"id": product_id, "name": name, "unitary_price": unitary_price, "units_stored": units_stored, "units_selled": units_selled})
    
    return jsonify( {"messege": "id not found"}), 404



# DELETE
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['DELETE'] )
@token_required
@user_resource
@product_resource
def remove_product(product_id, user_id):
    # Conectamos el cursor
    cur = mysql.connection.cursor()

    # Consultamos si esta visible el producto
    cur.execute('SELECT * FROM product WHERE id=%s AND user_id = %s AND visibility =%s', (product_id, user_id, True))
    
    # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
    if cur.rowcount > 0:
        cur.execute('UPDATE product SET visibility=%s WHERE id=%s', (False, product_id))
        mysql.connection.commit()
        return jsonify({"message": "deleted", "id": product_id})

    
    return jsonify( {"messege": "id not found"}), 404

