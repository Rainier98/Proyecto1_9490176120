// routes/perfiles.js
import express from 'express';
const router = express.Router();
import { getPerfil, crearActualizarPerfil } from '../controllers/perfilesController.js';
import { verifyToken } from '../utils/jwtUtils.js';

// Ruta para obtener el perfil del usuario autenticado
router.get('/', verifyToken, getPerfil);

// Ruta para crear o actualizar el perfil del usuario autenticado
router.put('/', verifyToken, crearActualizarPerfil);

export default router;
