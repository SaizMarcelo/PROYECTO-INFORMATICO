# Estrcutura a completar:
from api.db.db import mysql, DBError
import jwt
import datetime as dt
from api import app

class User():

    schema = {
        "username": str,
        "password": str,
        "name": str,
        "email": str,
        "address": str,
        "phone_number": str,
        "cuil_cuit": str
    }

    ## CHECK DATA SCHEMA ES UN COPY PASTE
    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in User.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != User.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._username = row[1]
        self._password = row[2]
        self._name = row[3]
        self._email = row[4]
        self._address = row[5]
        self._phone_number = row[6]
        self._cuil_cuit = row[7]
        self._visibility = row[8]
    
    def to_json(self):
        return {
            "id": self._id,
            "username": self._username,
            "password": self._password,
            "name": self._name,
            "email": self._email,
            "address": self._address,
            "phone_number": self._phone_number,
            "cuil_cuit": self._cuil_cuit,
            "visibility": self._visibility
        }
    
    ###########################################
    
    ###### COMPROBACION DE EXISTENCIA
    def user_exists(cuil_cuit):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM user WHERE cuil_cuit = %s', (cuil_cuit,))
        cur.fetchall()
        return cur.rowcount > 0
    
    ###### 
    # Login
    
    def login(auth):

        """ Control: existen valores para la autenticacion?"""
        if not auth or not auth.username or not auth.password:
            raise TypeError("Login No Autorizado")# existen librerias que facilitan el manejo de errores

        """ Control: existen y coincide el usuario en la BD?"""
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM user WHERE username = %s AND password = %s", (auth.username, auth.password))
        # Esperamos recibir una fila: devuelve 1ero en fila osea 1.
        row = cur.fetchone()

        # si la consulta no devuelve filas:
        if not row:
            return DBError("Login No Autorizado") # existen librerias que facilitan el manejo de errores

        """ El usuario existe en la BD y coincide su contrseña"""
        # Creamos una variable codificada:
        token = jwt.encode({
            'id': row[0],
            'exp': dt.datetime.utcnow() + dt.timedelta(minutes=100)   # tiempo de exporar el password. Tiempo para que el usurio vuelva a iniciar sesion. 
        }, app.config['SECRET_KEY'])
        
        return {"Token": token, "Username": auth.username, "id": row[0]}


    ###### CRUD

    ### CREATE
    def create_user(data):
        
        if User.check_data_schema(data):
            # check if user already exists
            if User.user_exists(data["cuil_cuit"]):
                raise DBError("Error creating user - user already exists")
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO user (username, password, name,  email, address, phone_number, cuil_cuit, visibility) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                        ( data["username"], data["password"], data["name"], data["email"], data["address"], data["phone_number"], data["cuil_cuit"], True))
            mysql.connection.commit()
            if cur.rowcount > 0:
                # get the id of the last inserted row
                cur.execute('SELECT LAST_INSERT_ID()')
                res = cur.fetchall()
                id = res[0][0]
                return User((id, data["username"], data["password"], data["name"], data["email"], data["address"], data["phone_number"], data["cuil_cuit"], True)).to_json()
            raise DBError("Error creating user - no row inserted")
        raise TypeError("Error creating user - wrong data schema")

    ### READ
    def get_user_by_id(id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM user WHERE id = %s', (id, ))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return User(data[0]).to_json()
        raise DBError("Error getting user by id - no row found")
    
    def get_all_users():
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM user')
        data = cur.fetchall()
        if cur.rowcount > 0:
            return User(data[0]).to_json()
        raise DBError("Error getting client by id - no row found")

    ### UPDATE
    def update_user(data):
        if User.check_data_schema(data):
            cur = mysql.connection.cursor()
            cur.execute('UPDATE user SET username = %s, password = %s, name = %s,  email= %s , address= %s , phone_number = %s, cuil_cuit = %s WHERE id = %s',
                        (data["username"], data["password"], data["name"],  data["email"], data["address"], data["phone_number"], data["cuil_cuit"], data["user_id"]))
            mysql.connection.commit()
            if cur.rowcount > 0:
                return User.get_user_by_id(data["user_id"])
            raise DBError("Error updating user - no row updated")
        raise TypeError("Error updating user - wrong data schema")

    ### DELETE
    def delete_user(id):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE id=%s AND visibility =%s', (id, True))
        if cur.rowcount > 0:
            cur.execute('UPDATE users SET visibility=%s WHERE id=%s', (False, id))
            mysql.connection.commit()
            return {"message": "deleted", "id": id}
        raise DBError("Error getting client by id - no row found")