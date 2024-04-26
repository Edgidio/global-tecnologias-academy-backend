import { validationResult } from 'express-validator';
import { validateEmployee } from '../../models/validations/validation_create_employee.js';

const middleware_validateEmployee = (req, res, next) => {
  // Ejecutar la validación utilizando el arreglo de validación definido
  validateEmployee.forEach(validation => validation(req));

  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


};

export default middleware_validateEmployee;