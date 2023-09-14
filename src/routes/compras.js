// routes/compras.js
import express from 'express';
const router = express.Router();
import { realizarCompra } from '../controllers/comprasController.js';
import { verifyToken } from '../utils/jwtUtils.js';

// Ruta para realizar una compra (requiere autenticación JWT)
router.post('/realizar', verifyToken, realizarCompra);

export default router;
