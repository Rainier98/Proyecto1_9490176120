import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const datosUsuario = jwt.verify(token, 'tu_secreto');
    req.usuario = datosUsuario; // Almacenar los datos del usuario en el objeto de solicitud (req) para su uso posterior.
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido.' });
  }
};

export const verificarRolAdmin = (req, res, next) => {
  const { rol } = req.usuario; // Suponiendo que en el token JWT se almacena el rol del usuario.

  if (rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado. No tienes permiso de administrador.' });
  }

  next();
};
