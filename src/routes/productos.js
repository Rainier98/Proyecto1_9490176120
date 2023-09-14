// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { createProduct } from '../controllers/productosController.js';
import { verifyToken } from '../models/productos.js';

// Ruta para crear un nuevo producto (requiere autenticación y rol de administrador)
router.post('/crear', verificarToken, verificarRolAdmin, crearProducto);

export default router;


