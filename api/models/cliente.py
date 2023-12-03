# Creamos una estructura de clase para el cliente:
from api.db.db import mysql, DBError

class Client():

    schema = {
        "user_id": int,
        "name": str,
        "email": str,
        "address": str,
        "phone_number": str,
        "cuil_cuit": str
    }

    ## CHECK DATA SCHEMA
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Client.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != Client.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._email = row[3]
        self._address = row[4]
        self._phone_number = row[5]
        self._cuil_cuit = row[6]
        self._visibility = row[7]

    def to_json(self):
        return {
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "email": self._email,
            "address": self._address,
            "phone_number": self._phone_number,
            "cuil_cuit": self._cuil_cuit,
            "visibility": self._visibility
        }
    
    ###########################################
    
    ###### COMPROBACION DEL CLIENTE
    def client_exists(cuil_cuit, user_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM client WHERE cuil_cuit =%s AND user_id = %s AND visibility = 1', (cuil_cuit, user_id))
        cur.fetchall()
        return cur.rowcount > 0
    
    ###### CRUD

    ### CREATE
    ###### SE COMPRUEBA SU EXISTENCIA ANTES DE CREAR EL CLIENTE
    def create_client(data):
        if Client.check_data_schema(data):
            # check if client already exists
            if Client.client_exists(data["cuil_cuit"], data["user_id"]):
                raise DBError("Error creating client - client already exists")
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO client (user_id, name, email, address, phone_number, cuil_cuit, visibility) VALUES ( %s, %s, %s, %s, %s, %s, %s)',
                         ( data["user_id"], data["name"], data["email"], data["address"], data["phone_number"], data["cuil_cuit"], True))
            mysql.connection.commit()
            if cur.rowcount > 0:
                # get the id of the last inserted row
                cur.execute('SELECT LAST_INSERT_ID()')
                res = cur.fetchall()
                id = res[0][0]
                return Client((id, data["user_id"], data["name"], data["email"], data["address"], data["phone_number"], data["cuil_cuit"], True)).to_json()
            raise DBError("Error creating client - no row inserted")
        raise TypeError("Error creating client - wrong data schema")

    ### READ
    ###### USO INTERNO DE CLIEN BY ID
    def get_client_by_id(id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM client WHERE id = %s AND visibility = 1', (id,))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Client(data[0]).to_json()
        raise DBError("Error getting client by id - no row found")
    
    def get_all_client(user_id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM client WHERE user_id =%s AND visibility = 1', (user_id,))
        data = cur.fetchall()
        clientList = []
        if cur.rowcount > 0:
            for row in data:
        # Creamos un objeto Cliente:
                objClient = Client(row)
                # Agregamos un elemento json a la lista:
                clientList.append(objClient.to_json())
            return clientList
        raise DBError("Error getting client by id - no row found")

    ### UPDATE
    ###### SE UTILIZA LA FUNCION DE CHECK DATA Y ACTUALIZA
    def update_client_by_id(id, data):
        if Client.check_data_schema(data):
            cur = mysql.connection.cursor()
            cur.execute('UPDATE client SET name = %s, email= %s , address= %s , phone_number = %s, cuil_cuit = %s WHERE id = %s',
                        (  data["name"], data["email"], data["address"], data["phone_number"], data["cuil_cuit"], id))
            mysql.connection.commit()
            if cur.rowcount > 0:
                return Client.get_client_by_id(id)
            raise DBError("Error updating client - no row updated")
        raise TypeError("Error updating client - wrong data schema")

    ### DELETE
    def remove_client_by_id(id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM client WHERE id=%s  AND visibility = 1', (id, ))
        if cur.rowcount > 0:
            cur.execute('UPDATE client SET visibility = %s WHERE id = %s', (False, id))
        
            mysql.connection.commit()
            return {"message": "deleted", "id": id}
        
        raise DBError("Error removing client - client not found")