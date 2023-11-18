class Invoice():

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._client_id = row[2]
        self._product_id = row[3]
        self._price_value = row[4]
        self._visibility = row[5]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "client_id": self._client_id,
            "product_id": self._product_id,
            "price_value": self._price_value,
            "visibility": self._visibility
        }
