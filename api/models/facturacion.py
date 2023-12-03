from api.db.db import mysql, DBError
from api.models.factura_producto_servicio import Product_Service_Invoice
from datetime import datetime

class Invoice():
    
    schema = {
        "user_id": int,
        "client_id": int,
        "user_cuil_cuit": str,
        "client_cuil_cuit": str,
        "products_services": list
    }

    ## CHECK DATA SCHEMA ES UN COPY PASTE
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Invoice.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            
            if type(data[key]) != Invoice.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id = row[0] # Nro De Factura - primary key
        self._user_id = row[1]
        self._client_id = row[2]
        self._user_cuil_cuit = row[3]
        self._client_cuil_cuit = row[4]
        self._date = row[5]
        self._total_iva = row[6]
        self._total_price = row[7]
        self._visibility = row[8]
       

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "client_id": self._client_id,
            "user_cuil_cuit": self._user_cuil_cuit,
            "client_cuil_cuit": self._client_cuil_cuit,
            "date": self._date,
            "total_iva": self._total_iva,
            "total_price": self._total_price,
            "visibility": self._visibility
        }
    
    ###########################################
    
    ###### CRUD

    ### CREATE

    def create_invoice(data):

        if not Invoice.check_data_schema(data):
            raise TypeError("Error creating invoice - wrong data schema")
        
        if len(data["products_services"]) < 1:
            raise TypeError("Error creating invoice - product/service not found")
        
        for product_service in data["products_services"]:
            if not Product_Service_Invoice.check_data_count_schema(product_service):
                raise TypeError("Error creating invoice - wrong data schema")
        
        
        date = datetime.now()
        total_iva = 0
        total_price = 0
        for product_service in data["products_services"]:
            partial = Product_Service_Invoice.count_price(product_service)
            total_iva += partial["iva_sub_total"]
            total_price += partial["sub_total"]

        
        ###### Creacion de la factura
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO invoice (user_id, client_id, user_cuil_cuit, client_cuil_cuit, date, total_iva, total_price, visibility) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s)',
                        ( data["user_id"], data["client_id"], data["user_cuil_cuit"], data["client_cuil_cuit"], date, total_iva, total_price,  True))
        mysql.connection.commit()
        
        if cur.rowcount < 1:
            raise DBError("Error creating invoice - no row inserted")

        ###### Creacion de los registros de productos y servicios
        cur.execute('SELECT LAST_INSERT_ID()')
        res = cur.fetchall() 
        id = res[0][0]
        
        invoice = (Invoice((id, data["user_id"], data["client_id"], data["user_cuil_cuit"], data["client_cuil_cuit"], date, total_iva, total_price,  True)).to_json())
        invoice_list = []
        
        for product_service in data["products_services"]:
            partial = Product_Service_Invoice.count_price(product_service)

            iva_sub_total = partial["iva_sub_total"]
            sub_total = partial["sub_total"]
            
            if product_service["prd_serv"] == "s":
                cur.execute('INSERT INTO product_service_invoice (invoice_id, user_id, client_id, prd_serv, product_id, service_id, units_hours, sub_total_iva, sub_total, visibility) VALUES ( %s, %s, %s, %s, NULL, %s, %s, %s, %s, %s)',
                                (id, data["user_id"], data["client_id"], product_service["prd_serv"], product_service["ps_id"], product_service["units_hours"], iva_sub_total, sub_total, True))
                mysql.connection.commit()
                cur.execute('SELECT LAST_INSERT_ID()')
                ps_id = cur.fetchone()
                product_service_invoice = Product_Service_Invoice((ps_id[0], id, data["user_id"], data["client_id"], product_service["prd_serv"],None, product_service["ps_id"],  product_service["units_hours"], iva_sub_total, sub_total, True)).to_json()
            
            elif product_service["prd_serv"] == "p":
                cur.execute('INSERT INTO product_service_invoice (invoice_id, user_id, client_id, prd_serv, product_id, service_id, units_hours, sub_total_iva, sub_total, visibility) VALUES ( %s, %s, %s, %s, %s, NULL, %s, %s, %s, %s)',
                                ( id, data["user_id"], data["client_id"], product_service["prd_serv"], product_service["ps_id"], product_service["units_hours"], iva_sub_total, sub_total, True))
                mysql.connection.commit()
                cur.execute('SELECT LAST_INSERT_ID()')
                ps_id = cur.fetchone()

                # ACTUALIZMOS EL STOCK
                cur.execute('SELECT units_stored FROM product WHERE id = %s', (product_service["ps_id"],))
                row = cur.fetchone()
                stock = row[0]
                reduce_stock = stock - product_service["units_hours"]
                cur.execute('UPDATE product SET units_stored = %s WHERE id = %s', (reduce_stock, product_service["ps_id"]))
                mysql.connection.commit()
                
                product_service_invoice = Product_Service_Invoice((ps_id[0], id, data["user_id"], data["client_id"], product_service["ps_id"], None, product_service["prd_serv"], product_service["units_hours"], iva_sub_total, sub_total, True)).to_json()
            
            else:
                raise DBError("Error creating invoice - no row inserted")
            
            
            if cur.rowcount < 1:
                raise DBError("Error creating invoice - no row inserted")
            
            
            invoice_list.append(product_service_invoice)
           
           
        output = {
            "invoice": invoice,
            "service_products": invoice_list
            }
        
        
        return output
    
    ##### READ
    def get_all_invoice_by_user_id(user_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM invoice WHERE user_id = %s AND visibility = 1', (user_id, ))
        data = cur.fetchall()

        if not data:
            raise DBError("Error - row not found")
        invoiceList = []

        # Creamos un bucle for: por cada fila: 
        for row in data:
            # Creamos un objeto invoiceo:
            
            objInvoice = Invoice(row).to_json()
            invoiceList.append(objInvoice)
        invoiceList.reverse()

        return invoiceList

    def get_invoice_by_id(id):

        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM invoice WHERE id = %s AND visibility = 1', (id, ))
        data = cur.fetchall()

        if not data:
            raise DBError("Error")
        
        objInvoice = Invoice(data[0]).to_json()

        output = {
            "invoice": objInvoice,
            "service_products": []}

        cur.execute('SELECT * FROM product_service_invoice WHERE invoice_id = %s AND visibility = 1', (id, ))
        service = cur.fetchall()
        for serv in service:
            objProdServ = Product_Service_Invoice(serv)
            output["service_products"].append(objProdServ.to_json())
        
        
        return output

    ##### DELETE
    def remove_invoice(invoice_id):
        cur = mysql.connection.cursor()

        # Consultamos si esta visible el producto
        cur.execute('SELECT * FROM invoice WHERE id=%s AND visibility = 1', (invoice_id, ))

        # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
        if cur.rowcount > 0:
            cur.execute('UPDATE invoice SET visibility=%s WHERE id=%s', (False, invoice_id))
            mysql.connection.commit()
            

            cur.execute('SELECT * FROM product_service_invoice WHERE invoice_id=%s  AND visibility =%s', (invoice_id, True))

            # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
            if cur.rowcount > 0:
                cur.execute('UPDATE product_service_invoice SET visibility=%s WHERE invoice_id=%s', (False, invoice_id))
                mysql.connection.commit()
            
            
            return {"message": "deleted", "id": invoice_id}


        raise DBError("Error deleting invoice - id not found")
    

    ##### RANKING FACTURA CLIENTE
    def ranking_clients(user_id):
        try:
            # BUSCAMOS TODODS LAS FACTURAS POR CLIENTE DEL USUARIO
            invoices = Invoice.get_all_invoice_by_user_id(user_id)
        except Exception as e:
            raise e
        # CREAMOS VARIABLES DE APOYO Y SALIDA
        output = []
        invoiceObj = {}


        for invoice in invoices:

            # Actualiza las compras por cliente
            if invoiceObj.get(invoice["client_id"]):
                invoiceObj[invoice["client_id"]]["total_buys"]+= 1
                invoiceObj[invoice["client_id"]]["total_mount"]+= invoice["total_price"]

            # Ingresa compra de cliente
            else:
                invoiceObj[invoice["client_id"]] = {"total_buys": 1,
                                                   "total_mount": invoice["total_price"]}
                

        # CREAMOS OBJETOS CON LOS DATOS ENTEROS POR CLIENTE
        for key in invoiceObj.keys():
            objAux = {"ps_id": key,
                      "count": invoiceObj[key]["total_buys"],
                      "total_mount": invoiceObj[key]["total_mount"]}
            
            # Ingresamos en la salida
            output.append(objAux)
        

        # Ordenamos los clientes por cantidad de compras
        for i in range(len(output) - 1):
            
            for j in range(len(output) - i):
                if output[j + i]["count"] > output[i]["count"]:
                    aux = output[i]
                    output[i] = output[j + i]
                    output[j + i] = aux
        
        return output
        