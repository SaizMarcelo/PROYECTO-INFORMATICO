from flask import Flask,  render_template
from flask_cors import CORS


# Creamos la API a ejecutar:
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'app_123'

@app.route('/')
def index():
    return render_template('public/index.html')


import api.routes.usuario
# Conectamos las rutas de clientes
import api.routes.cliente
# Conectamos las rutas de facturacion
import api.routes.facturacion
# Conectamos las rutas de servicios
import api.routes.servicios
# Conectamos las rutas de productos
import api.routes.productos
# Conectamos las rutas a la api raiz.
import api.routes.rutasHTML