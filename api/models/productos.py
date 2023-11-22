from api.db.db import mysql, DBError


class Product():

    # ESQUEMA
    schema = {
        "user_id": int,
        "name": str,
        "unitary_price": int,
        "units_stored": int,
        "iva": int,
        "description": str
    }

    # CHEK DATA SCHEMA
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Product.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != Product.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._unitary_price = row[3]
        self._units_stored = row[4]
        self._iva = row[5]
        self._description = row[6]
        self._visibility = row[7]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "unitary_price": self._unitary_price,
            "units_stored": self._units_stored,
            "iva": self._iva,
            "description": self._description,
            "visibility": self._visibility
        }
    
    ###########################################
    

    ###### COMPROBACION DE LA EXISTENCIA DEL PRODUCTO
    def product_exists(name, user_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM product WHERE name =%s AND user_id = %s AND visibility = 1', (name, user_id))
        cur.fetchall()
        return cur.rowcount > 0

    ###### CRUD

    ### CREATE
    def create_product(data):
        if Product.check_data_schema(data):
            # check if product already exists
            if Product.product_exists(data["name"], data["user_id"]):
                raise DBError("Error creating product - product already exists")
            
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO product (user_id, name, unitary_price, units_stored, iva, description, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s)', (data["user_id"], data["name"] , data["unitary_price"], data["units_stored"], data["iva"], data["description"], True))
            mysql.connection.commit()
            if cur.rowcount > 0:
                # get the id of the last inserted row
                cur.execute('SELECT LAST_INSERT_ID()')
                res = cur.fetchall()
                id = res[0][0]
                return Product((id, data["user_id"], data["name"] , data["unitary_price"], data["units_stored"], data["iva"], data["description"], True )).to_json()
            raise DBError("Error creating product - no row inserted")
        raise TypeError("Error creating product - wrong data schema")
    
    ### READ
    def get_product_by_id(id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM product WHERE id=%s  AND visibility = 1', (id,))
        data = cur.fetchall()
        
        if cur.rowcount > 0:
            objProduct = Product(data[0])
            return  objProduct.to_json() 
        return DBError("Error getting product - product not found")
    
    def get_all_products_by_user_id(user_id):
    # Creamos un cursor:
        cur = mysql.connection.cursor()

        # Realizamos una consulta SQL:
        cur.execute('SELECT * FROM product WHERE user_id = %s AND visibility = 1', (user_id, ))

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
        return productList

    ### UPDATE

    def update_product(product_id, data):
        if not Product.check_data_schema(data):
            raise TypeError("Error data type not allowed")
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM product WHERE id=%s AND visibility = 1', (product_id,))

        if cur.rowcount > 0:
            cur.execute('UPDATE product SET name = %s, unitary_price = %s, units_stored = %s, iva = %s, description = %s WHERE id=%s', (data["name"] , data["unitary_price"], data["units_stored"], data["iva"], data["description"], product_id))
        
            mysql.connection.commit()
            return Product.get_product_by_id(product_id)
        
        raise DBError("Error updating product - product not found")
        
    ### DELETE
    def remove_product_by_id(product_id):
    # Conectamos el cursor
        cur = mysql.connection.cursor()

        # Consultamos si esta visible el producto
        cur.execute('SELECT * FROM product WHERE id=%s AND visibility = 1', (product_id, ))
        
        # Si existe el producto lo "ELIMINAMOS" (cambio de visibilidad)
        if cur.rowcount > 0:
            cur.execute('UPDATE product SET visibility=%s WHERE id=%s', (False, product_id))
            mysql.connection.commit()
            return {"message": "deleted", "id": product_id}

        
        raise DBError("Error removing product - product not found")