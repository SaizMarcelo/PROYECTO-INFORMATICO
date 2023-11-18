from api import app # importamos el objeto app
from api.models.facturacion import Invoice # importamos clase factura
from flask import jsonify, request
from api.utils import token_required, user_resource, invoice_resource
from api.db.db import mysql

# CREATE
@app.route('/users/<int:user_id>/invoice', methods = ['POST'] )
def create_invoice(user_id):
    pass



# READ
# Ruta: Get de invoicee a traves del ID:
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['GET'] )
@token_required
@user_resource
@invoice_resource
def get_invoice_by_id(user_id, invoice_id):
    pass

# RUTA: consulta todos los invoicees de un usuario:
@app.route('/users/<int:user_id>/invoice', methods = ['GET'] )
@token_required
@user_resource
def get_all_invoices_by_user_id(user_id):
    pass



# UPDATE
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['PUT'] )
@token_required
@user_resource
@invoice_resource
def update_invoice(user_id, invoice_id):
    
    pass



# DELETE
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['DELETE'] )
@token_required
@user_resource
@invoice_resource
def remove_invoice(invoice_id, user_id):
   pass
