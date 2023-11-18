class Product():

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self._unitary_price = row[3]
        self._units_stored = row[4]
        self._iva = row[5]
        self._visibility = row[6]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "unitary_price": self._unitary_price,
            "units_stored": self._units_stored,
            "iva": self._iva,
            "visibility": self._visibility
        }
    

    """
    control de productos
    """
