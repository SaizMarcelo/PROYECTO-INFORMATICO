-- Aqui vamos a indicar todo el codigo SQL que vamos a estar utilizando, a veces se separa en Codigo de Cracion de BBDD y Codigo de carga de datos:

CREATE DATABASE IF NOT EXISTS db_api_test;

-- Creamos la tabla de Usuarios:
CREATE TABLE IF NOT EXISTS users (
    id INT(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id)   
);

-- Insertamos Usuarios
INSERT INTO users VALUES
(1, "admin", "admin", "nombre", "generico", "falso@mail.com", "direccion 123", "111222233", 1);

-- Creamos la tabla de Clientes:
CREATE TABLE IF NOT EXISTS client (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL, 
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertamos Clientes
INSERT INTO client VALUES
(1, 1, "cliente", "primero", "falso@cliente.com", "lugar 425", "222333344", 1);


-- Creamos la tabla de Productos:
CREATE TABLE IF NOT EXISTS product (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    unitary_price INT(10) NOT NULL,
    units_stored INT(10) NOT NULL,
    iva INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertamos Producto
INSERT INTO product VALUES
(1, 1, "producto", 200, 2000, 21, 1);

-- Creamos la tabla de Servicios:
CREATE TABLE IF NOT EXISTS service (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    hour_price INT(10) NOT NULL,
    iva INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertamos Producto
INSERT INTO service VALUES
(1, 1, "servicio", 20, 21, 1);

-- Creamos la tabla de Facturas:
CREATE TABLE IF NOT EXISTS invoice (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    client_id INT(10) NOT NULL,
    date DATETIME NOT NULL,
    iva_total INT(10) NOT NULL,
    total_price INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

-- Insertamos Facturas
INSERT INTO invoice VALUES
(1, 1, 1, '2023-11-18 12:30:00', 210, 1000, 1);


CREATE TABLE IF NOT EXISTS product_invoice (
    id INT(10) NOT NULL AUTO_INCREMENT,
    invoice_id INT(10) NOT NULL,
    user_id INT(10) NOT NULL,
    client_id INT(10) NOT NULL,
    ps_id INT(10) NOT NULL,
    prd_serv CHAR(1) NOT NULL,
    units_hours INT(10) NOT NULL,
    iva_subtotal INT(10) NOT NULL,
    sub_total INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (ps_id) REFERENCES product(id)
);
-- Insertamos Producto
INSERT INTO product_invoice VALUES
(1, 1, 1, 1, 1, 'p', 1, 210, 1000, 1);

CREATE TABLE IF NOT EXISTS service_invoice (
    id INT(10) NOT NULL AUTO_INCREMENT,
    invoice_id INT(10) NOT NULL,
    user_id INT(10) NOT NULL,
    client_id INT(10) NOT NULL,
    ps_id INT(10) NOT NULL,
    prd_serv CHAR(1) NOT NULL,
    units_hours INT(10) NOT NULL,
    iva_subtotal INT(10) NOT NULL,
    sub_total INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (ps_id) REFERENCES service(id)
);
INSERT INTO service_invoice VALUES
(1, 1, 1, 1, 1, 's', 60, 210, 1000, 1);

