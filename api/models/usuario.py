# Estrcutura a completar:
class User():
    def __init__(self, row):
        self._id = row[0]
        self._username = row[1]
        self._password = row[2]
        self._name = row[3]
        self._surname = row[4]
        self._email = row[5]
        self._address = row[6]
        self._phone_number = row[7]
        self._visibility = row[8]
    
    def to_json(self):
        return {
            "id": self._id,
            "username": self._username,
            "password": self._password,
            "name": self._name,
            "surname": self._surname,
            "email": self._email,
            "address": self._address,
            "phone_number": self._phone_number,
            "visibility": self._visibility
        }
    

