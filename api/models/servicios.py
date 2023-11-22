from api.db.db import mysql, DBError

class Service():

    schema = {
        "user_id": int,
        "name": str,
        "hour_price": int,
        "iva": int,
        "description": str
    }

    ## CHECK DATA SCHEMA ES UN COPY PASTE
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Service.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != Service.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._hour_price = row[3]
        self._iva = row[4]
        self._description = row[5]
        self._visibility = row[6]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "hour_price": self._hour_price,
            "iva": self._iva,
            "description": self._description,
            "visibility": self._visibility            
        }
    
    ###########################################
    def service_exists(name, user_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM service WHERE name =%s AND user_id = %s AND visibility = 1', (name, user_id))
        cur.fetchall()
        return cur.rowcount > 0

    ###### CRUD

    ### CREATE

    def create_service(data):
        if not Service.check_data_schema(data):
            raise TypeError("Error creating service - wrong data schema")
        
        if Service.service_exists(data["name"], data["user_id"]):
            raise DBError("Error creating service - service already exists")
        
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO service (user_id, name, hour_price, iva, description, visibility) VALUES (%s, %s, %s, %s, %s, %s)',
                    (data["user_id"], data["name"], data["hour_price"], data["iva"], data["description"], True))
        mysql.connection.commit()
        cur.execute('SELECT LAST_INSERT_ID()')
        row = cur.fetchone()
    
        id = row[0]
        return Service((id, data["user_id"], data["name"], data["hour_price"], data["iva"], data["description"], True )).to_json()


    ### READ
    # Ruta: Get de service a traves del ID:

    def get_service_by_id(service_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM service WHERE id=%s AND visibility = %s', (service_id, True))
        data = cur.fetchall()
        
        if cur.rowcount > 0:
            objtservice = Service(data[0])
            return ( objtservice.to_json() )
        raise DBError("Error getting service by id - no row found")

    # Consultar todos los serviceos

    def get_all_services_by_user_id(user_id):
        # Creamos un cursor:
        cur = mysql.connection.cursor()

        # Realizamos una consulta SQL:
        cur.execute('SELECT * FROM service WHERE user_id = %s AND visibility = %s', (user_id, True))

        # Esperamos mas de un registro:
        data = cur.fetchall()

        # Creamos una lista vacia:
        serviceList = []
        if cur.rowcount > 0:
            # Creamos un bucle for: por cada fila: 
            for row in data:
                # Creamos un objeto servicee:
                objservice = Service(row)
                # Agregamos un elemento json a la lista:
                serviceList.append(objservice.to_json())
            # Retornamos la lista de elementos json:
            return (serviceList)
        raise DBError("Error getting service by id - no row found")
    ### UPDATE

    def update_service(data, service_id):
        
        if not Service.check_data_schema(data):
            raise TypeError("Error updating service - wrong data schema")
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM service WHERE id=%s AND visibility = 1', (service_id,))

        if cur.rowcount > 0:
            cur.execute('UPDATE service SET name = %s, hour_price = %s, iva = %s, description = %s WHERE id=%s',
                        (data["name"], data["hour_price"], data["iva"], data["description"], service_id))
        
            mysql.connection.commit()
            if cur.rowcount > 0:
                return Service.get_service_by_id(service_id)
            raise DBError("Error updating service - no row updated")
        raise DBError("Error updating service - service not found")

    ### DELETE

    def remove_service(service_id):
        cur = mysql.connection.cursor()
        # Consultamos si esta visible el servicio y existe
        cur.execute('SELECT * FROM service WHERE id=%s AND visibility = 1', (service_id,))
        
        # Si existe el servicio lo "ELIMINAMOS" (cambio de visibilidad)
        if cur.rowcount > 0:
            cur.execute('UPDATE service SET visibility=%s WHERE id=%s', (False, service_id))
            mysql.connection.commit()
            return ({"message": "deleted", "id": service_id})

        return DBError("Error removing service - service not found")
