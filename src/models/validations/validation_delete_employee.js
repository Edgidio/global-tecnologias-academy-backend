import { param, validationResult } from 'express-validator';
import connection from '../../database.js';

const validateEmployeeId = [
  // Validar el parámetro `id` en la URL
  param('id', 'El ID del empleado debe ser un número entero válido.').isInt().toInt(),
  // Verificar si hay errores de validación
  async (req, res, next) => {

    const { id } = req.params;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verificar si el empleado existe
    const [employeeRows] = await connection.execute('SELECT * FROM employees WHERE id = ?', [id]);

    // Si no se encontró ningún empleado con el ID especificado
    if (employeeRows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    // Si no hay errores, continuar con la ejecución normal
    next();
  }
];

export default validateEmployeeId;