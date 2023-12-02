# PROYECTO-INFORMATICO
Repositorio de la materia proyecto informatico

## INTEGRANTES GRUPO 12: 
- PISCIOLA, FEDERICO
- SAIZ, MARCELO
- SANTI, ANTONELLA

## Extracto de la Documentacion (se recomienda su lectura)
## 2.	PROCEDIMIENTOS INICIALES Y PUESTA EN FUNCIONAMIENTO DE LA API

---2.1	VISUAL STUDIO CODE (recomendado): Editor de texto. 
Como editor de texto vamos a utilizar VISUAL STUDIO CODE (recomendado) debido a que fue el utilizado al realizar y programar la API: FACTURACION ONLINE. 
Link de Descarga: https://code.visualstudio.com/download

---2.2  XAMPP (recomendado): Motor de base de datos: 
Como motor de base de datos vamos a utilizar (recomendado) XAMPP que nos permitirá con APACHE crear un servidor local “Local Host” para hacer las correspondientes consultas desde la API: FrontEnd al BackEnd, y con MYSQL nos permitirá gestionar nuestra base de datos y su correspondiente estructura. 
Link de Descarga: https://www.apachefriends.org/es/index.html

---2.3  SISTEMA DE CONTROL DE VERSIONES:
Como sistema de control de versiones se utilizó GIT y el repositorio donde se encontrara todos los archivos, documentación y código necesarios para utilizar la API: FACTURACION ONLINE se encontraran en GITHUB.
Link de Descarga: https://git-scm.com/ 
Link del Repositorio: https://github.com/SaizMarcelo/PROYECTO-INFORMATICO

---2.4  TESTEOS DEL LADO DEL CLIENTE: TUNDER CLIENT
Los testeos realizados por el equipo de programación de la API: FACTURACION ONLINE fueron realizados en todo momento utilizando la extensión TUNDER CLIENT (recomendada), extensión del VISUAL STUDIO CODE.

---2.5	 PROCEDIMIENTO PUESTA EN FUNCIONAMIENTO
En el presente apartado se dar procedimiento paso a paso para realizar todas las configuraciones necesarias y requeridas para la puesta en funcionamiento de la API: FACTURACION ONLINE.

---2.5.1: Crear carpeta vacia.

---2.5.2: Inicializar git a lacarpeta vacia: comando = 
"git init"

---2.5.3: Agregamos al repositorio local el repositorio de github: comandos =
"git remote add origin https://github.com/SaizMarcelo/PROYECTO-INFORMATICO.git"
"git pull origin main"

---2.5.4: Creamos entorno virtual de trabajo: comandos =
"py -3 -m venv .venv"

---2.5.5: Activamos entorno virtual de trabajo: comandos =
".venv/Scripts/Activate"

---2.5.6: Instalamos requerimientos minimos: comandos =
"pip install requirements"

---2.5.7: Ejecutamos API: comandos =
"py main.py"
"http://127.0.0.1:4500"