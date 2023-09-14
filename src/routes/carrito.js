// routes/carrito.js
import express from 'express';
const router = express.Router();
import { getCarrito, updateCartItemQuantity, deleteCartItem } from '../controllers/carritoController.js';
import { verifyToken } from '../utils/jwtUtils.js';

// Ruta para obtener el carrito de un usuario (requiere autenticación JWT)
router.get('/obtener', verifyToken, getCarrito);

// Ruta para actualizar la cantidad de un producto en el carrito (requiere autenticación JWT)
router.post('/actualizar', verifyToken, updateCartItemQuantity);

// Ruta para eliminar un producto del carrito (requiere autenticación JWT)
router.delete('/eliminar', verifyToken, deleteCartItem);

export default router;
