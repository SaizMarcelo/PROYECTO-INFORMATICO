class Service():

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._hour_price = row[3]
        self._iva = row[4]
        self._visibility = row[5]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "hour_price": self._hour_price,
            "iva": self._iva,
            "visibility": self._visibility            
        }
    
    """
    control de servicios
    """