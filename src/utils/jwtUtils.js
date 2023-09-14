// utils/jwtUtils.js
import jwt from 'jsonwebtoken';

const secretKey = 'tu_clave_secreta'; // Debe coincidir con la clave secreta en tu servidor

// Middleware para verificar el token
export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    // Verificar el token y obtener los datos del usuario
    jwt.verify(req.token, secretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403); // Forbidden (token no válido)
      } else {
        req.userId = authData.id; // Agregar el ID del usuario a la solicitud
        next();
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
