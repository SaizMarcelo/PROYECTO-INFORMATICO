from flask import  render_template
from api import app



# Redireccionamiento: BIEN VENIDO
@app.route('/dashboard')
def dashboard():
    return render_template('public/dashboard.html')
