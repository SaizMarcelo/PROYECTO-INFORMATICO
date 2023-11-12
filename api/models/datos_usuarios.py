# Creamos una estructura de clase para el cliente:
class DatosUsuario():

    def __init__(self, row):
        self._kf_id = row[0]
        self._cuit_cuil_usuario = row[1]
        self._denominacion_nombre_apellido = row[2]
        self._domicilio = row[3]
        self._email = row[4]
        self._telefono = row[5]


    def to_json(self):
        return{
            "kf_id": self._kf_id,
            "cuit_cuil_usuario": self._cuit_cuil_usuario,
            "denominacion_nombre_apellido": self._denominacion_nombre_apellido,
            "domicilio": self._domicilio,
            "email": self._email,
            "telefono": self._telefono,

        }