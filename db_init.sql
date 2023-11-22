-- Aqui vamos a indicar todo el codigo SQL que vamos a estar utilizando, a veces se separa en Codigo de Cracion de BBDD y Codigo de carga de datos:

CREATE DATABASE IF NOT EXISTS db_api_test;

-- Creamos la tabla de Usuarios:
CREATE TABLE IF NOT EXISTS user (
    id INT(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    cuil_cuit VARCHAR(15) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id)   
);

INSERT INTO user VALUES
(1, "admin", "admin", "admin", "admin@admin.com", "ficticio 123", "2222444444", "20400000002", 1);

-- Creamos la tabla de Clientes:
CREATE TABLE IF NOT EXISTS client (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL, 
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    cuil_cuit VARCHAR(15) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO client VALUES
(1, 1, "client", "client@client.com", "ficticio 234", "1111333333", "20410000002", 1);

-- Creamos la tabla de Productos:
CREATE TABLE IF NOT EXISTS product (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    unitary_price INT(10) NOT NULL,
    units_stored INT(10) NOT NULL,
    iva INT(10) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO product VALUES
(1, 1, "producto", 2000, 200, 21, "es un producto", 1);

-- Creamos la tabla de Servicios:
CREATE TABLE IF NOT EXISTS service (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    hour_price INT(10) NOT NULL,
    iva INT(10) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO service VALUES
(1, 1, "servicio", 200, 21, "es un servicio", 1);

-- Creamos la tabla de Facturas:
CREATE TABLE IF NOT EXISTS invoice (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    client_id INT(10) NOT NULL,
    user_cuil_cuit VARCHAR(15) NOT NULL,
    client_cuil_cuit VARCHAR(15) NOT NULL,
    date DATETIME NOT NULL,
    total_iva INT(10) NOT NULL,
    total_price INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);
INSERT INTO invoice VALUES
(1, 1, 1, "20400000002", "20410000002","2023-11-18 12:30:00", 42, 2000, 1);


-- Creamos la tabal de facturacion del producto
CREATE TABLE IF NOT EXISTS product_service_invoice (
    id INT(10) NOT NULL AUTO_INCREMENT,
    invoice_id INT(10) NOT NULL,
    user_id INT(10) NOT NULL,
    client_id INT(10) NOT NULL,
    prd_serv CHAR(1) NOT NULL,
    product_id INT(10),
    service_id INT(10),
    units_hours INT(10) NOT NULL,
    sub_total_iva INT(10) NOT NULL,
    sub_total INT(10) NOT NULL,
    visibility TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (service_id) REFERENCES service(id)

);

INSERT INTO product_service_invoice VALUES
(1, 1, 1, 1, "p", 1, NULL, 1, 42, 2000, 1)
