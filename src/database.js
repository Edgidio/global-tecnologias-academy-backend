import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos MySQL
const connection = await mysql.createConnection({
  host: 'localhost',       // Cambia esto si tu base de datos está en un host remoto
  user: 'root',      // Nombre de usuario de tu base de datos
  password: '1234567890',  // Contraseña de tu base de datos
  database: 'global_tecnologias_academy'  // Nombre de la base de datos que utilizarás
});


// Exportar la conexión para que pueda ser utilizada desde otros archivos
export default connection;
