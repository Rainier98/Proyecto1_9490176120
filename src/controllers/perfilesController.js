// controllers/perfilesController.js
import Perfil from '../models/perfil.js';

// Función para obtener el perfil de un usuario
export const getPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.findOne({ usuario: req.userId });
    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.status(200).json({ perfil });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// Función para crear o actualizar el perfil de un usuario
export const crearActualizarPerfil = async (req, res) => {
  try {
    const { direccion, fechaNacimiento, numeroTelefonico } = req.body;
    const perfilExistente = await Perfil.findOne({ usuario: req.userId });

    if (perfilExistente) {
      // Actualizar el perfil si ya existe
      perfilExistente.direccion = direccion || perfilExistente.direccion;
      perfilExistente.fechaNacimiento = fechaNacimiento || perfilExistente.fechaNacimiento;
      perfilExistente.numeroTelefonico = numeroTelefonico || perfilExistente.numeroTelefonico;

      await perfilExistente.save();
      res.status(200).json({ message: 'Perfil actualizado exitosamente', perfil: perfilExistente });
    } else {
      // Crear un nuevo perfil si no existe
      const nuevoPerfil = new Perfil({
        usuario: req.userId,
        direccion,
        fechaNacimiento,
        numeroTelefonico,
      });

      await nuevoPerfil.save();
      res.status(201).json({ message: 'Perfil creado exitosamente', perfil: nuevoPerfil });
    }
  } catch (error) {
    console.error('Error al crear o actualizar el perfil:', error);
    res.status(500).json({ message: 'Error al crear o actualizar el perfil' });
  }
};
