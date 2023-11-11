-- Aqui vamos a indicar todo el codigo SQL que vamos a estar utilizando, a veces se separa en Codigo de Cracion de BBDD y Codigo de carga de datos:
<<<<<<< HEAD

CREATE DATABASE IF NOT EXISTS db_api_flask;

USE db_api_proyfinal;

-- Creamos la tabla de Datos Usuarios:
CREATE TABLE IF NOT EXISTS datos_usuarios (
    kf_id INT(10) NOT NULL,
    cuit_cuil_usuario INT(15) NOT NULL,
    denominacion_nombre_apellido VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    domicilio VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    PRIMARY KEY(kf_id),
    FOREIGN KEY (kf_id) REFERENCES users(id)
)

-- Ingresamos datos de 1 usuario:
INSERT INTO datos_usuarios VALUES
(1, 20331205002, 'Pisciolari Chauvie Federico Nicolas', 'federicopisciolari@gmail.com', 'Juan Jose Paso 1133 - Punta Alta', '291-4633833')
=======
-- Aqui vamos a indicar todo el codigo SQL que vamos a estar utilizando, a veces se separa en Codigo de Cracion de BBDD y Codigo de carga de datos:
-- Aqui vamos a indicar todo el codigo SQL que vamos a estar utilizando, a veces se separa en Codigo de Cracion de BBDD y Codigo de carga de datos:
>>>>>>> bf2646240285661705540fa692df0a901e783853
