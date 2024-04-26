import express from 'express';
const app = express();

// Setting 
app.set("PORT", 4000)

app.use(express.json());

import employeeRoutes from './routers/employeeRoutes.js';

// Usar las rutas de empleados
app.use(employeeRoutes);

// Exportar `app` para que pueda ser utilizada desde otros archivos
export default app;

