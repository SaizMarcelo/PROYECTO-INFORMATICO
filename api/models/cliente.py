# Creamos una estructura de clase para el cliente:
class Client():

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._surname = row[3]
        self._email = row[4]
        self._address = row[5]
        self._phone_number = row[6]
        self._visibility = row[7]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "surname": self._surname,
            "email": self._email,
            "address": self._address,
            "phone_number": self._phone_number,
            "visibility": self._visibility
        }
    
