import { body } from 'express-validator';

// Validación de los campos del empleado
export const validateEmployee = [
  body('firstName', 'El primer nombre es requerido y debe contener solo letras mayúsculas sin acentos ni Ñ.')
    .isAlpha('en-US', { ignore: ' ' })
    .isLength({ max: 20 }),
  body('lastName', 'El primer apellido es requerido y debe contener solo letras mayúsculas sin acentos ni Ñ.')
    .isAlpha('en-US', { ignore: ' ' })
    .isLength({ max: 20 }),
  body('otherNames', 'Los otros nombres deben contener solo letras mayúsculas sin acentos ni Ñ.')
    .optional()
    .isAlpha('en-US', { ignore: ' ' })
    .isLength({ max: 50 }),
  body('country', 'El país debe ser Colombia o Estados Unidos.').isIn(['Colombia', 'Estados Unidos']),
  body('identificationType', 'El tipo de identificación es requerido.').notEmpty(),
  body('dateOfEntry', 'La fecha de ingreso debe ser una fecha válida y no puede ser superior a la fecha actual.')
    .isBefore(new Date().toISOString())
    .toDate(),
  body('area', 'El área es requerida.').notEmpty()
];
