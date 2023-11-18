class Product_Service_Invoice():

    def __init__(self, row):
        self._id = row[0]
        self._invoice_id = row[1]
        self._user_id = row[2]
        self._client_id = row[3]
        self._ps_id = row[4]
        self._prd_serv = row[5]
        self._units_hours = row[6]
        self._iva_subtotal = row[7]
        self._sub_total = row[8]
        self._visibility = row[9]
       

    def to_json(self):
        return{
            "id": self._id,
            "invoice_id": self._invoice_id,
            "user_id": self._user_id,
            "client_id": self._client_id,
            "ps_id": self._ps_id,
            "prd_serv": self._prd_serv,
            "units_hours": self._units_hours,
            "iva_subtotal" : self._iva_subtotal,
            "sub_total": self._sub_total,
            "visibility": self._visibility
        }
