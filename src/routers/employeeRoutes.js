import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import { validateEmployee } from '../models/validations/validation_create_employee.js';
import validateEmployeeId from '../models/validations/validation_delete_employee.js';
import { validateUpdateEmployee } from '../models/validations/validation_update_employee.js';

const router = express.Router();

// Rutas para las operaciones CRUD de empleados
router.post('/employees',validateEmployee, createEmployee);
router.get('/employees', getAllEmployees);
router.put('/employees/:id', [validateEmployeeId, validateUpdateEmployee], updateEmployee);
router.delete('/employees/:id', validateEmployeeId, deleteEmployee);

export default router;
