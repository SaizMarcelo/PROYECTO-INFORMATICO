class Service():

    def __init__(self, row):
        self._id = row[0]
        self._user_id = row[1]
        self._name = row[2]
        self.hour_price = row[3]
        self.services_contracted = row[4]
        self._visibility = row[5]

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "name": self._name,
            "hour_price": self.hour_price,
            "services_contracted": self.services_contracted,
            "visibility": self._visibility            
        }
    