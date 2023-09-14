// routes/usuarios.js
import express from 'express';
const router = express.Router();
import { crearUsuario, actualizarUsuario } from '../controllers/usuariosController.js';
import { verificarToken } from '../middlewares/authMiddleware.js'; // Importa el middleware

// Ruta para crear un nuevo usuario (requiere autenticación)
router.post('/crear', verificarToken, crearUsuario);

// Ruta para actualizar un usuario (requiere autenticación)
router.put('/:id', verificarToken, actualizarUsuario);

export default router;
