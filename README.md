
## Backend del Proyecto: Gestión de Empleados


### Descripción del Proyecto
Este proyecto consiste en un backend desarrollado con Express.js y MySQL para administrar un sistema de empleados. Proporciona una API RESTful que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los empleados.

## Instalación

 1. Clona este repositorio en tu máquina local:



```bash
git clone https://github.com/tu-usuario/nombre-proyecto.git
```
 2. Clona este repositorio en tu máquina local:

```bash
cd nombre-proyecto npm install
```
3. Configura las variables de entorno creando un archivo `.env` y configurando las siguientes variables:

 ```plaintext
  DB_HOST=localhost DB_USER=tu_usuario DB_PASSWORD=tu_contraseña DB_DATABASE=nombre_base_de_datos PORT=4000
```

4. Configura las variables de entorno creando un archivo `.env` y configurando las siguientes variables:

```bash
npm start
```

## Estructura del Proyecto
La estructura de carpetas y archivos del proyecto es la siguiente:

```bash
nombre-proyecto/
 ├── src/
	 │ ├── controllers/
	 │ ├── models/
	 │ ├── routes/
	 │ ├── validations/
	 │ └── app.js
├── .env
├── package.json
└── README.md
```

-   **`src/controllers/`**: Contiene los controladores que manejan las solicitudes HTTP y las respuestas.
-   **`src/models/`**: Contiene los modelos de datos que interactúan con la base de datos.
-   **`src/routes/`**: Contiene las rutas de la API que definen las operaciones disponibles.
-   **`src/validations/`**: Contiene las validaciones de datos utilizando Express Validator.
-   **`src/app.js`**: Archivo principal de la aplicación donde se configuran y se montan las rutas y middleware.

## Tecnologías Utilizadas
-   Node.js
-   Express.js
-   MySQL
-   Express Validator

## Documentación de la API

La API expone los siguientes endpoints:

### Crear Empleado

-   **URL**: `POST /api/employees`
-   **Descripción**: Crea un nuevo empleado en la base de datos.
-   **Parámetros de Entrada**:
    -   `firstName` (string): Primer nombre del empleado.
    -   `lastName` (string): Primer apellido del empleado.
    -   `otherNames` (string, opcional): Otros nombres del empleado.
    -   `country` (string): País del empleo (Colombia o Estados Unidos).
    -   `identificationType` (string): Tipo de identificación del empleado.
    -   `identificationNumber` (string): Número de identificación del empleado.
    -   `dateOfEntry` (string): Fecha de ingreso del empleado (formato: YYYY-MM-DD).
    -   `area` (string): Área de trabajo del empleado.
    
#### Ejemplo de Solicitud

```bash
{  
"firstName":  "Juan",  
"lastName":  "Perez",  
"country":  "Colombia",  
"identificationType":  
"Cédula de Ciudadanía",  
"identificationNumber":  "123456789",  
"dateOfEntry":  "2024-04-30",  
"area":  "Administración"  
}
```

#### Respuesta Exitosa

```bash
{  "message":  "Empleado creado exitosamente"  }
```

### Leer Empleado por ID

-   **URL**: `GET /api/employees/:id`
-   **Descripción**: Obtiene los detalles de un empleado específico.
-   **Parámetros de Ruta**:
    -   `id` (string): ID único del empleado.
#### Respuesta Exitosa

```bash
{  
"id":  1,  
"firstName":  "Juan",  
"lastName":  "Perez",  
"country":  "Colombia",  
"identificationType":  
"Cédula de Ciudadanía",  
"identificationNumber":  "123456789",  
"email":  "juan.perez@global.com.co",  
"dateOfEntry":  "2024-04-30",  
"area":  "Administración",  
"status":  "Activo",  
"createdAt":  "2024-04-25T12:00:00Z",  
"updatedAt":  "2024-04-25T12:00:00Z"  
}
```

### Actualizar Empleado por ID

-   **URL**: `PUT /api/employees/:id`
    
-   **Descripción**: Actualiza los datos de un empleado existente.
    
-   **Parámetros de Ruta**:
    
    -   `id` (string): ID único del empleado.
-   **Parámetros de Entrada (Opcionales)**: Cualquier combinación de los siguientes campos para actualizar:
    
    -   `firstName` (string): Nuevo primer nombre del empleado.
    -   `lastName` (string): Nuevo primer apellido del empleado.
    -   `otherNames` (string, opcional): Nuevos otros nombres del empleado.
    -   `country` (string): Nuevo país de empleo (Colombia o Estados Unidos).
    -   `identificationType` (string): Nuevo tipo de identificación del empleado.
    -   `identificationNumber` (string): Nuevo número de identificación del empleado (máx. 20 caracteres, alfanumérico).
    -   `dateOfEntry` (string): Nueva fecha de ingreso del empleado (formato: YYYY-MM-DD).
    -   `area` (string): Nueva área de trabajo del empleado.

**Ejemplo de Solicitud:**

```bash
{  
"firstName":  "Nuevo Juan",  
"lastName":  "Nuevo Perez"  
}
```

**Respuesta Exitosa**:

```bash
{  "message":  "Empleado actualizado exitosamente"  }
```

### Eliminar Empleado por ID

-   **URL**: `DELETE /api/employees/:id`
    
-   **Descripción**: Elimina un empleado existente según su ID.
    
-   **Parámetros de Ruta**:
    
    -   `id` (string): ID único del empleado a eliminar.
-   **Respuesta Exitosa**:
    
    -   Código de estado HTTP 200 OK con el siguiente mensaje:

```bash
{  "message":  "Empleado eliminado exitosamente"  }
```

**Respuesta de Error**:

-   Código de estado HTTP 404 Not Found si el empleado no se encuentra:

```bash
{  "error":  "Empleado no encontrado"  }
```
