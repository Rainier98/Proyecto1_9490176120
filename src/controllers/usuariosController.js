// controllers/usuariosController.js
import Usuario from '../models/usuarios.js';

// Función para crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      fechaNacimiento,
      clave,
      validacionClave,
      direccionEntrega,
      NIT,
      numeroTelefonico,
      correoElectronico,
    } = req.body;

    // Verificar si el usuario ya existe (puedes agregar esta validación según tus necesidades)
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      fechaNacimiento,
      clave,
      validacionClave,
      direccionEntrega,
      NIT,
      numeroTelefonico,
      correoElectronico,
    });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

// Función para actualizar un usuario existente
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      fechaNacimiento,
      clave,
      validacionClave,
      direccionEntrega,
      NIT,
      numeroTelefonico,
      correoElectronico,
    } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    usuarioExistente.nombres = nombres || usuarioExistente.nombres;
    usuarioExistente.apellidos = apellidos || usuarioExistente.apellidos;
    usuarioExistente.fechaNacimiento = fechaNacimiento || usuarioExistente.fechaNacimiento;
    usuarioExistente.clave = clave || usuarioExistente.clave;
    usuarioExistente.validacionClave = validacionClave || usuarioExistente.validacionClave;
    usuarioExistente.direccionEntrega = direccionEntrega || usuarioExistente.direccionEntrega;
    usuarioExistente.NIT = NIT || usuarioExistente.NIT;
    usuarioExistente.numeroTelefonico = numeroTelefonico || usuarioExistente.numeroTelefonico;
    usuarioExistente.correoElectronico = correoElectronico || usuarioExistente.correoElectronico;

    await usuarioExistente.save();

    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarioExistente });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};
