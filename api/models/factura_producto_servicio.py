from api.db.db import mysql, DBError
from api.models.servicios import Service
from api.models.productos import Product


class Product_Service_Invoice():

    schema = {
        "invoice_id": int,
        "user_id": int,
        "client_id": int,
        "ps_id": int,
        "prd_serv": str,
        "units_hours": int,
        "iva_subtotal" : int,
        "sub_total": int
    }

    count_schema = {
        "ps_id": int,
        "prd_serv": str,
        "units_hours": int
    }

    ## CHECK DATA SCHEMA ES UN COPY PASTE
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Product_Service_Invoice.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            
            if type(data[key]) != Product_Service_Invoice.schema[key]:
                
                return False
        return True
    
    ## CHECK DATA SCHEMA ES UN COPY PASTE
    def check_data_count_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Product_Service_Invoice.count_schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != Product_Service_Invoice.count_schema[key]:
                print("es aca")
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._invoice_id = row[1]
        self._user_id = row[2]
        self._client_id = row[3]
        self._prd_serv = row[4]
        self._product_id = row[5]
        self._service_id = row[6]
        self._units_hours = row[7]
        self._iva_subtotal = row[8]
        self._sub_total = row[9]
        self._visibility = row[10]

    def to_json(self):
        json = {
            "id": self._id,
            "invoice_id": self._invoice_id,
            "user_id": self._user_id,
            "client_id": self._client_id,
            "prd_serv": self._prd_serv,
            "units_hours": self._units_hours,
            "iva_subtotal" : self._iva_subtotal,
            "sub_total": self._sub_total,
            "visibility": self._visibility
        }
        if self._product_id:
            json["ps_id"] = self._product_id
        elif self._service_id:
            json["ps_id"] = self._service_id
        return json

    ###########################################
    def count_price(data):
        if not Product_Service_Invoice.check_data_count_schema(data):
            raise TypeError("Error data schema - data schema not allowed")
        
        
        if data["prd_serv"] == 'p':

            

            product = Product.get_product_by_id(data["ps_id"])

            if data["units_hours"] > product["units_stored"]:
                raise DBError("Error stock - product out of stock")

            value = ((product["unitary_price"] * data["units_hours"]) * (((100 + product["iva"])) / 100))
            iva_value = value - (product["unitary_price"] * data["units_hours"])
            value = int(value)
            iva_value = int(iva_value)
            output = {
                "iva_sub_total": iva_value,
                "sub_total": value
            }
            
            return output

        elif data["prd_serv"] == 's':

            

            service = Service.get_service_by_id(data["ps_id"])


            value = ((service["hour_price"] * data["units_hours"]) * (((100 + service["iva"])) / 100))
            iva_value = value - (service["hour_price"] * data["units_hours"])
            value = int(value)
            iva_value = int(iva_value)
            output = {
                "iva_sub_total": iva_value,
                "sub_total": value
            }
            
            return output

        else:
            raise DBError("Error - atribute not found")