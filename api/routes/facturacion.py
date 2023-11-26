from api import app # importamos el objeto app
from api.models.facturacion import Invoice
from api.models.factura_producto_servicio import Product_Service_Invoice # importamos clase factura
from flask import jsonify, request
from api.utils import token_required, user_resource, invoice_resource


# CREATE
@app.route('/users/<int:user_id>/invoice', methods = ['POST'] )
@user_resource
@token_required
def create_invoice(user_id):

    data = request.get_json()
    data["user_id"] = user_id
    try:
        newInvoice = Invoice.create_invoice(data)
        return jsonify( newInvoice ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400
    

    
# READ
# Ruta: Get de invoicee a traves del ID:
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['GET'] )
@token_required
@user_resource
@invoice_resource
def get_invoice_by_id(invoice_id, user_id):
    try:
        invoice = Invoice.get_invoice_by_id(invoice_id)
        return jsonify( invoice ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400



# RUTA: consulta todos los invoicees de un usuario:
@app.route('/users/<int:user_id>/invoice', methods = ['GET'] )
@token_required
@user_resource
def get_all_invoices_by_user_id(user_id):
    try:
        invoices = Invoice.get_all_invoice_by_user_id(user_id)
        return jsonify( invoices ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

# RUTA: consulta todos los invoicees de un usuario:
@app.route('/users/<int:user_id>/invoice_ranking_service', methods = ['GET'] )
@token_required
@user_resource
def get_ranking_service_by_user_id(user_id):
    try:
        invoices = Product_Service_Invoice.count_service_ofered(user_id)
        return jsonify( invoices ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/users/<int:user_id>/invoice_ranking_product', methods = ['GET'] )
@token_required
@user_resource
def get_ranking_product_by_user_id(user_id):
    try:
        invoices = Product_Service_Invoice.count_product_selled(user_id)
        return jsonify( invoices ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/users/<int:user_id>/invoice_ranking_client', methods = ['GET'] )
@token_required
@user_resource
def get_ranking_client_by_user_id(user_id):
    try:
        invoices = Invoice.ranking_clients(user_id)
        return jsonify( invoices ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400


@app.route('/users/<int:user_id>/invoice_control_flow_product', methods = ['GET'] )
@token_required
@user_resource
def get_control_flow_product_by_user_id(user_id):
    try:
        invoices = Product_Service_Invoice.control_flow_product(user_id)
        return jsonify( invoices ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400



# DELETE
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['DELETE'] )
@token_required
@user_resource
@invoice_resource
def remove_invoice(invoice_id, user_id):
    try:
        invoice = Invoice.remove_invoice(invoice_id)
        return jsonify( invoice ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400