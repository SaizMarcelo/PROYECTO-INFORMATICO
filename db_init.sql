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
(2, "carlosberger", "carlos", "Carlos Berger", "carlos.berger@hotmail.com", "Italia 20", "2914273698", "20389192703", 1);
(3, "anapaez", "ana", "Ana Paez", "ana.paez@hotmail.com", "Rincón 567", "2914368623", "27404357893", 1);

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
(2, 1, 'Luther McQuorkell', 'lmcquorkell0@amazon.com', '7 Melrose Place', '938 879 0997', "20389753452", 1);
(3, 1, 'Homere Cokayne', 'hcokayne1@rediff.com', '790 Blaine Road', '796 959 1529', "20382359872", 1);
(4, 1, 'Minne Boundy', 'mboundy2@biblegateway.com', '08 Southridge Trail', '449 995 4781', "27381284332", 1);
(5, 1, 'Moore O''Hagirtie', 'mohagirtie3@ycombinator.com', '515 Sunbrook Lane', "20388762342", 11, 1)

(6, 2, 'Ula Larkins', 'ularkins4@cdc.gov', '7 Scofield Road', '138 404 1526', "27422177642", 1);
(7, 2, 'Renado Dupree', 'rdupree5@hugedomains.com', '40 Holmberg Circle', '333 266 8664', "20390730943", 1);
(8, 2, 'Marlo Joselson', 'mjoselson6@networksolutions.com', '31179 Schiller Junction', '396 572 3538', "27394949233", 1);
(9, 2, 'Wendy Ghioni', 'wghioni7@free.fr', '85287 Main Park', '366 916 3827', "27328360603", 1);
(10, 2, 'Evita Gerram', 'egerram8@cocolog-nifty.com', '66821 Russell Pass', '447 871 4812', "27399719416", 1);

(10, 3, 'Romola Rawlence', 'rrawlence9@123-reg.co.uk', '6 Becker Pass', '569 890 3326', "20407364242", 1);
(11, 3, 'Farra Ivantyev', 'fivantyeva@hc360.com', '10 Grover Place', '175 683 1446', "20412649223", 1);
(12, 3, 'Humfried Klicher', 'hklicherb@posterous.com', '53 Lawn Place', '576 679 3346', "20284259921", 1);
(13, 3, 'Karena Grange', 'kgrangec@mozilla.org', '4004 Clarendon Pass', '116 790 6313', "27364330087", 1);
(14, 3, 'Missy Saggs', 'msaggsd@nymag.com', '05764 Hintze Junction', '915 818 6243', "274233665701", 1);

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
(1, 1, "Alicate", 15968, 50, 21, "ALICATE CORTE OBLICUO 8 SATINADO", 1);
(2, 1, "Cortahierro", 6599, 15, 21, "CORTAHIERRO 6.5X130 MM", 1);
(3, 1, "Amoladora", 39500, 6, 21, "AMOLADORA ANGULAR 9 /230MM 2200W CON MANGO+CARBON EXTRA INDUSTRIAL", 1);
(4, 1, "Taladro", 59416, 4, 21, "TALADRO ATORNILLADOR 10MM 12V", 1);
(5, 2, "Protector solar", 7514, 150, 21, "Protector solar Dermaglós FPS 50 en emulsión de 250 mL", 1);
(6, 2, "Agua Micelar", 10500, 26, 21, "Nivea Agua Micelar 400ml", 1);
(7, 2, "Crema", 3354, 7, 21, "Bagovit Crema Para Manos Y Uñas Vit A X 50gr", 1);
(8, 3, "Skort", 14999, 5, 21, "Skort Isostasia", 1);
(9, 3, "Cinto", 3750, 50, 21, "Cinto con tachas", 1);
(10, 3, "Musculosa", 6625, 20, 21, "Musculosa Lia", 1);

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
(1, 1, "Instalación", 200, 21, "Servicio instalacion maquinaria", 1);
(1, 1, "Reparación", 200, 21, "Servicio reparacion varios", 1);
(1, 2, "Masaje", 200, 21, "Masaje drenaje linfático", 1);
(1, 2, "Entrega", 200, 21, "Servicio de entrega a domicilio", 1);
(1, 3, "Confección", 200, 21, "Confección personalizada", 1);

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
(2, 2, 7, "20389192703", "27394949233","2023-11-23 12:30:00", 3645, 21000, 1);
(3, 3, 14, "27404357893", "274233665701","2023-12-01 12:30:00", 2603, 14999, 1);


-- Creamos la tabla de facturacion del producto
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
(1, 2, 2, 7, "p", 7, NULL, 2, 3645, 21000, 1)
(1, 3, 3, 14, "p", 8, NULL, 1, 2603, 14999, 1)
