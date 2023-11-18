class Invoice():

    def __init__(self, row):
        self._id = row[0] # Nro De Factura - primary key
        self._user_id = row[1]
        self._client_id = row[2]
        self._date = row[3]
        self._iva_total = row[4]
        self._total_price = row[5]
        self._visibility = row[6]
       

    def to_json(self):
        return{
            "id": self._id,
            "user_id": self._user_id,
            "client_id": self._client_id,
            "date": self._date,
            "iva_total": self._iva_total,
            "total_price": self._total_price,
            "visibility": self._visibility
        }


"""
{
    id
    --------------
    nro_factura
    user_id = emisor
    client_id = receptor
    producto_id
    nombre_producto
    ----------------
    tipo = producto/servicio
    cantidad/hs = int
    iva_subtotal = cuentra
    sub_total
}

"""
"""
factura:
{
    id = nro_factura
    fecha
    user_id = emisor
    client_id = receptor
    total_iva = cuenta Sum ivas
    total
}

"""

"""
facturacio -> fecha / emisor / receptor
    
    --- //aun no emitida
    cargamos productos / servicios -> llamada a controles
    calculamos total
    
    --- // emitir get --- nroFactura
    registramos factura -> BBDD
    registramos facturacion productos / servicios -> BBDD

    mensaje de confirmacion
"""