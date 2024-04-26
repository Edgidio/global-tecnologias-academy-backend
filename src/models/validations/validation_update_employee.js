import { body, validationResult, param } from 'express-validator';

export const validateEmployeeId = [
    param('id')
      .isNumeric()
      .withMessage('El ID del empleado debe ser un valor numérico.')
      .custom(async (id) => {
        // Verificar si el empleado con el ID proporcionado existe en la base de datos
        const [rows] = await connection.execute('SELECT id FROM employees WHERE id = ?', [id]);
        if (rows.length === 0) {
          throw new Error('El empleado con el ID proporcionado no existe.');
        }
        return true;
      })
];

// Validación de los campos para la actualización de empleado
export const validateUpdateEmployee = [
    body('firstName')
    .optional()
      .matches(/^[A-Za-z]+$/)
      .withMessage('El primer nombre debe contener solo letras de la A a la Z, sin la letra "ñ".')
      .isLength({ max: 20 })
      .withMessage('El primer nombre debe tener máximo 20 caracteres.'),
  
    body('lastName')
    .optional()
      .matches(/^[A-Za-z]+$/)
      .withMessage('El primer apellido debe contener solo letras de la A a la Z, sin la letra "ñ".')
      .isLength({ max: 20 })
      .withMessage('El primer apellido debe tener máximo 20 caracteres.'),
  
    body('otherNames')
      .optional()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('Los otros nombres deben contener solo letras de la A a la Z, sin la letra "ñ" y espacios entre nombres.')
      .isLength({ max: 50 })
      .withMessage('Los otros nombres deben tener máximo 50 caracteres.'),
  
    body('country')
    .optional()
      .isIn(['Colombia', 'Estados Unidos'])
      .withMessage('El país debe ser Colombia o Estados Unidos.'),
  
    body('identificationType')
    .optional()
      .notEmpty()
      .withMessage('El tipo de identificación es requerido.')
      .withMessage('El tipo de identidad es requerido.')
      .isIn(['Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte', 'Permiso Especial'])
      .withMessage('El área debe ser una de las opciones disponibles.'),
  
    body('identificationNumber')
    .optional()
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage('El número de identificación debe ser alfanumérico y puede contener los caracteres a-z, A-Z, 0-9, y "-"')
      .isLength({ max: 20 })
      .withMessage('El número de identificación debe tener máximo 20 caracteres.'),
  
    body('dateOfEntry')
    .optional()
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('La fecha de ingreso debe ser una fecha válida en formato YYYY-MM-DD.')
      .custom((value) => {
        const currentDate = new Date();
        const entryDate = new Date(value);
        const maxPastDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        return entryDate <= currentDate && entryDate >= maxPastDate;
      })
      .withMessage('La fecha de ingreso no puede ser superior a la fecha actual ni más de un mes en el pasado.'),
  
    body('area')
    .optional()
      .notEmpty()
      .withMessage('El área es requerida.'),
  
    // Middleware de validación: verificar si hay errores de validación
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Si no hay errores de validación, continuar con la ejecución
      next();
    }
  ];
