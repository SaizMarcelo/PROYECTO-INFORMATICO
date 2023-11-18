from api import app # importamos el objeto app
from api.models.facturacion import Invoice # importamos clase factura
from api.models.factura_producto_servicio import Product_Service_Invoice
from flask import jsonify, request
from api.utils import token_required, user_resource, invoice_resource
from api.db.db import mysql
from datetime import datetime

# CREATE
@app.route('/users/<int:user_id>/invoice', methods = ['POST'] )
@user_resource
@token_required
def create_invoice(user_id):

    """ ENTRADA MODELO ESPERADA

    {
      "client_id": 1,
      "iva_total": 210,
      "total_price": 1000,

      "products_services": [
      {
        "client_id": 1,
        "invoice_id": 1,
        "iva_subtotal": 210,
        "prd_serv": "p",
        "ps_id": 1,
        "sub_total": 1000,
        "units_hours": 1,
        "user_id": 1
      },
      {
        "client_id": 1,
        "invoice_id": 1,
        "iva_subtotal": 210,
        "prd_serv": "s",
        "ps_id": 1,
        "sub_total": 1000,
        "units_hours": 60
      }
    ]
  }
    """
    
    client_id = request.get_json()["client_id"]
    iva_total = request.get_json()["iva_total"]
    total_price = request.get_json()["total_price"]
    products_services = request.get_json()["products_services"]

    if len(products_services) < 1:
        return jsonify({"message": "PRODUCT-SERVICE NOT EXIST"})
    
    output = []
    products_services_output = []
    date = datetime.now()

    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO invoice (user_id, client_id, date, iva_total, total_price, visibility) VALUES (%s, %s, %s, %s, %s, %s)', (user_id, client_id, date, iva_total, total_price, True))
    mysql.connection.commit()
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
    invoice_id = row[0]
    output.append({"invoice": {"id": invoice_id, "user_id": user_id, "client_id": client_id, "date": date, "iva_total": iva_total, "total_price": total_price}})
    
    for prod_serv in products_services:
        ps_id = prod_serv["ps_id"]
        prd_serv = prod_serv["prd_serv"]
        units_hours = prod_serv["units_hours"]
        iva_subtotal = prod_serv["iva_subtotal"]
        sub_total = prod_serv["sub_total"]

        if prd_serv == 's':
            cur.execute('INSERT INTO service_invoice (invoice_id, user_id, client_id, ps_id, prd_serv, units_hours, iva_subtotal, sub_total, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (invoice_id, user_id, client_id, ps_id, prd_serv, units_hours, iva_subtotal, sub_total, True))
        elif prd_serv == 'p':
            cur.execute('INSERT INTO product_invoice (invoice_id, user_id, client_id, ps_id, prd_serv, units_hours, iva_subtotal, sub_total, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (invoice_id, user_id, client_id, ps_id, prd_serv, units_hours, iva_subtotal, sub_total, True))
        mysql.connection.commit()
        cur.execute('SELECT LAST_INSERT_ID()')
        row = cur.fetchone()
        products_services_id = row[0]
        products_services_output.append({"id": products_services_id, "invoice_id": invoice_id, "user_id": user_id, "client_id": client_id, "ps_id": ps_id, "prd_serv": prd_serv, "units_hours": units_hours, "iva_subtotal": iva_subtotal, "sub_total": sub_total} )
    
    output.append({"products_services": products_services_output})
    
    return jsonify(output)

    
# READ
# Ruta: Get de invoicee a traves del ID:
@app.route('/users/<int:user_id>/invoice/<int:invoice_id>', methods = ['GET'] )
@token_required
@user_resource
@invoice_resource
def get_invoice_by_id(user_id, invoice_id):

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM invoice WHERE user_id = %s AND visibility = %s', (user_id, True))
    # Esperamos mas de un registro:
    
    data = cur.fetchall()

    if not data:

        return jsonify( {"messege": "id not found"}), 404

    # Creamos una lista vacia:
    
    invoiceList = []
     # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto invoiceo:
        objFactura = []
        objInvoice = Invoice(row)
        jsonInvoice = objInvoice.to_json()
        invoice_id = jsonInvoice["id"]

        cur.execute('SELECT * FROM product_invoice WHERE invoice_id = %s AND visibility = %s', (invoice_id, True))
        product = cur.fetchall()
        for pro in product:
            objProdServ = Product_Service_Invoice(pro)
            objFactura.append(objProdServ.to_json())
            
        cur.execute('SELECT * FROM service_invoice WHERE invoice_id = %s AND visibility = %s', (invoice_id, True))
        service = cur.fetchall()
        for serv in service:
            objProdServ = Product_Service_Invoice(serv)
            objFactura.append(objProdServ.to_json())

        # Agregamos un elemento json a la lista:
        invoiceList.append({"invoice": jsonInvoice, "products_services": objFactura})
    # Retornamos la lista de elementos json:
    return jsonify(invoiceList)


# RUTA: consulta todos los invoicees de un usuario:
@app.route('/users/<int:user_id>/invoice', methods = ['GET'] )
@token_required
@user_resource
def get_all_invoices_by_user_id(user_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM invoice WHERE user_id = %s AND visibility = %s', (user_id, True))
    # Esperamos mas de un registro:
    data = cur.fetchall()
    # Creamos una lista vacia:

    if not data:
        return jsonify( {"messege": "id not found"}), 404
    
    invoiceList = []
     # Creamos un bucle for: por cada fila: 
    for row in data:
        # Creamos un objeto invoiceo:
        objFactura = []
        objInvoice = Invoice(row)
        jsonInvoice = objInvoice.to_json()
        invoice_id = jsonInvoice["id"]

        cur.execute('SELECT * FROM product_invoice WHERE invoice_id = %s AND visibility = %s', (invoice_id, True))
        product = cur.fetchall()
        for pro in product:
            objProdServ = Product_Service_Invoice(pro)
            objFactura.append(objProdServ.to_json())
            
        cur.execute('SELECT * FROM service_invoice WHERE invoice_id = %s AND visibility = %s', (invoice_id, True))
        service = cur.fetchall()
        for serv in service:
            objProdServ = Product_Service_Invoice(serv)
            objFactura.append(objProdServ.to_json())

        # Agregamos un elemento json a la lista:
        invoiceList.append({"invoice": jsonInvoice, "products_services": objFactura})
    # Retornamos la lista de elementos json:
    return jsonify(invoiceList)


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
    cur = mysql.connection.cursor()

    # Consultamos si esta visible el producto
    cur.execute('SELECT * FROM invoice WHERE id=%s AND user_id = %s AND visibility =%s', (invoice_id, user_id, True))

    # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
    if cur.rowcount > 0:
        cur.execute('UPDATE invoice SET visibility=%s WHERE id=%s', (False, invoice_id))
        mysql.connection.commit()
        

        cur.execute('SELECT * FROM product_invoice WHERE invoice_id=%s AND user_id = %s AND visibility =%s', (invoice_id, user_id, True))

        # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
        if cur.rowcount > 0:
            cur.execute('UPDATE product_invoice SET visibility=%s WHERE invoice_id=%s', (False, invoice_id))
            mysql.connection.commit()
        
        
        cur.execute('SELECT * FROM service_invoice WHERE invoice_id=%s AND user_id = %s AND visibility =%s', (invoice_id, user_id, True))

        # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
        if cur.rowcount > 0:
            cur.execute('UPDATE service_invoice SET visibility=%s WHERE invoice_id=%s', (False, invoice_id))
            mysql.connection.commit()

        return jsonify({"message": "deleted", "id": invoice_id})


    return jsonify( {"messege": "id not found"}), 404