import connection from '../database.js';
import { validationResult } from 'express-validator';

// Función para generar un identificador alfanumérico único de longitud específica
const generateAlphanumericId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos: letras mayúsculas y números
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const isEmailInUse = async (email) => {
  const sql = 'SELECT COUNT(*) AS count FROM employees WHERE email = ?';
  const [rows] = await connection.query(sql, [email]);
  return rows[0].count > 0;
};

const generateUniqueEmail = async (firstName, lastName, domain) => {
  let count = 0;
  let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  
  while (await isEmailInUse(email)) {
    count++;
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${count}@${domain}`;
  }
  
  return email;
};

// Controladores para las operaciones CRUD de empleados
export const createEmployee = async (req, res) => {


  try {

    // Verificar errores de validación
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      otherNames,
      country,
      identificationType,
      dateOfEntry,
      area
    } = req.body;

    const domain = country === 'Colombia' ? 'global.com.co' : 'global.com.us';
  
    let email = await generateUniqueEmail(firstName, lastName, domain);

      // Generar un UUID único
    const alphanumericId = generateAlphanumericId(20);
    const [results] = await connection.execute(
      `INSERT INTO employees (firstName, lastName, otherNames, country, identificationType, identificationNumber, email, dateOfEntry, area)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, otherNames, country, identificationType, alphanumericId, email, dateOfEntry, area]
    );

    res.status(201).json({ message: 'Empleado creado exitosamente', employeeId: results.insertId });


  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ message: 'Ocurrió un error al crear el empleado' });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los empleados' });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  // Filtra los campos válidos que se van a actualizar
  const validFields = Object.entries(fieldsToUpdate)
    .filter(([key, value]) => value !== undefined && value !== '');

  // Extrae los nombres de campo y valores válidos
  const fieldNames = validFields.map(([key]) => key);
  const fieldValues = validFields.map(([, value]) => value);

  // Construye la parte SET de la consulta SQL
  const fieldSetters = fieldNames.map((fieldName) => `${fieldName}=?`).join(', ');

  const sql = `UPDATE employees SET ${fieldSetters} WHERE id=?`;
  fieldValues.push(id); // Agrega el ID al final del array de valores

  try {
    await connection.execute(sql, fieldValues);
    res.json({ message: 'Empleado actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el empleado' });
  }
};


export const deleteEmployee = async (req, res) => {

  const { id } = req.params;

  try {
    await connection.execute('DELETE FROM employees WHERE id=?', [id]);
    res.json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el empleado' });
  }
};
