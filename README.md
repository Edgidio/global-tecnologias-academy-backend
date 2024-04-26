Backend del Proyecto: Gestión de Empleados
Este proyecto backend está desarrollado utilizando Node.js, Express.js y MySQL para gestionar el registro y la administración de empleados a través de una API RESTful.

Instalación
Clonar el Repositorio
bash
Copy code
git clone https://github.com/tu-usuario/nombre-proyecto.git
Instalar Dependencias
bash
Copy code
cd nombre-proyecto
npm install
Configuración de Variables de EntornoCrea un archivo .env en la raíz del proyecto y configura las siguientes variables:
plaintext
Copy code
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=nombre_base_de_datos
PORT=4000
Iniciar el Servidor
bash
Copy code
npm start
Estructura del Proyecto
El proyecto sigue una estructura de carpetas y archivos organizada de la siguiente manera:

bash
Copy code
nombre-proyecto/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   └── app.js
├── .env
├── package.json
└── README.md
src/controllers/: Controladores que manejan las solicitudes HTTP y las respuestas.
src/models/: Modelos de datos que interactúan con la base de datos.
src/routes/: Rutas de la API que definen las operaciones disponibles.
src/validations/: Validaciones de datos utilizando Express Validator.
src/app.js: Archivo principal de la aplicación donde se configuran y montan las rutas y middleware.
Tecnologías Utilizadas
Node.js
Express.js
MySQL
Express Validator
Documentación de la API
Crear Empleado
URL: POST /api/employees
Descripción: Crea un nuevo empleado en la base de datos.
Parámetros de Entrada:
Campo	Tipo	Descripción
firstName	string	Primer nombre del empleado.
lastName	string	Primer apellido del empleado.
otherNames	string	(Opcional) Otros nombres del empleado.
country	string	País de empleo (Colombia o Estados Unidos).
identificationType	string	Tipo de identificación del empleado (Cédula de Ciudadanía, Pasaporte, etc.).
identificationNumber	string	Número de identificación del empleado (máx. 20 caracteres, alfanumérico).
dateOfEntry	string	Fecha de ingreso del empleado (formato: YYYY-MM-DD).
area	string	Área de trabajo del empleado (Administración, Finanzas, etc.).
Ejemplo de Solicitud
json
Copy code
{
  "firstName": "Juan",
  "lastName": "Perez",
  "country": "Colombia",
  "identificationType": "Cédula de Ciudadanía",
  "identificationNumber": "123456789",
  "dateOfEntry": "2024-04-30",
  "area": "Administración"
}
Respuesta Exitosa
json
Copy code
{
  "message": "Empleado creado exitosamente"
}
Leer Empleado por ID
URL: GET /api/employees/:id
Descripción: Obtiene los detalles de un empleado específico.
Parámetros de Ruta:
id (string): ID único del empleado.
Respuesta Exitosa
json
Copy code
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Perez",
  "country": "Colombia",
  "identificationType": "Cédula de Ciudadanía",
  "identificationNumber": "123456789",
  "email": "juan.perez@global.com.co",
  "dateOfEntry": "2024-04-30",
  "area": "Administración",
  "status": "Activo",
  "createdAt": "2024-04-25T12:00:00Z",
  "updatedAt": "2024-04-25T12:00:00Z"
}
Actualizar Empleado por ID
URL: PUT /api/employees/:id
Descripción: Actualiza los datos de un empleado existente.
Parámetros de Ruta:
id (string): ID único del empleado.
Parámetros de Entrada (Opcionales):Cualquier combinación de los siguientes campos para actualizar:
Campo	Tipo	Descripción
firstName	string	Nuevo primer nombre del empleado.
lastName	string	Nuevo primer apellido del empleado.
otherNames	string	(Opcional) Nuevos otros nombres del empleado.
country	string	Nuevo país de empleo (Colombia o Estados Unidos).
identificationType	string	Nuevo tipo de identificación del empleado.
identificationNumber	string	Nuevo número de identificación del empleado (máx. 20 caracteres, alfanumérico).
dateOfEntry	string	Nueva fecha de ingreso del empleado (formato: YYYY-MM-DD).
area	string	Nueva área de trabajo del empleado (Administración, Finanzas, etc.).
Ejemplo de Solicitud
json
Copy code
{
  "firstName": "Nuevo Juan",
  "lastName": "Nuevo Perez"
}
Respuesta Exitosa
json
Copy code
{
  "message": "Empleado actualizado exitosamente"
}
