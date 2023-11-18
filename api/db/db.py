# Importamos la app de api para utilizar la configuracion:
from api import app
# Importamos la clase MySQL de la libreria:
from flask_mysqldb import MySQL

# Configuracion MYSQL
app.config['MYSQL_HOST'] ='localhost'
app.config['MYSQL_USER'] ='db_api_test'
app.config['MYSQL_PASSWORD'] ='password'
app.config['MYSQL_DB'] ='db_api_test'

# Vinculamos la cofiguracion al objeto MySQL con la app:
mysql = MySQL(app)