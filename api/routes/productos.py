from api import app # importamos el objeto app
from api.models.productos import Product # importamos clase producto
from flask import jsonify, request
from api.utils import token_required, user_resource, product_resource



# CREATE
@app.route('/users/<int:user_id>/product', methods = ['POST'] )
@token_required
@user_resource
def crate_product(user_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        product = Product.create_product(data)
        return jsonify (product)
    except Exception as e:
        return jsonify( {"messege": e.args[0]}), 404
    

# READ

# Ruta: Get de producte a traves del ID:
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['GET'] )
@token_required
@user_resource
@product_resource
def get_product_by_id(product_id, user_id):
    try:
        prodcut = Product.get_product_by_id(product_id)
        return jsonify(prodcut)
    except Exception as e:
        return jsonify( {"messege": e.args[0]}), 404
    
    

# Consultar todos los productos
@app.route('/users/<int:user_id>/product', methods = ['GET'] )
@token_required
@user_resource
def get_all_products_by_user_id(user_id):
    products = Product.get_all_products_by_user_id(user_id)
    return jsonify (products)


# UPDATE
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['PUT'] )
@token_required
@user_resource
@product_resource
def update_product(user_id, product_id):
    data = request.get_json()
    data["user_id"] = user_id
    try:
        update = Product.update_product(product_id, data)
        return jsonify(update)
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
    



# DELETE
@app.route('/users/<int:user_id>/product/<int:product_id>', methods = ['DELETE'] )
@token_required
@user_resource
@product_resource
def remove_product(product_id, user_id):
    try:
        remove = Product.remove_product_by_id(product_id)
        return jsonify( remove ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

