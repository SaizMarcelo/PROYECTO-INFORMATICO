# Importamos la aplicacion desde la api: 
from api import app
# Importamos sys: libreria que nos permite interactuar con el interprete y obtener info. sobre la plataforma que se esta ejecutando con Python.
import sys

# sys.argv: nos devuelve una lista de argumentos de la linea de comandos:
# SI esta lista es mayor a 1 y en indice 1 tenemos la palabra list ejecutamos la rul_map de la app:
if len(sys.argv)>1 and sys.argv[1] == "list":
    print(app.url_map)
    print(sys.argv[0])
    print(sys.argv[1])


# SINO si el __name__ coincide con __main__: que se ejecute la app por el puerto:
elif __name__ == '__main__':
    app.run(debug=True, port=4500)
