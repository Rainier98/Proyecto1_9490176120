// controllers/productosController.js
import Producto from '../models/productos.js';

// Función para obtener toda la información de un producto
export const getProductInfo = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ producto });
  } catch (error) {
    console.error('Error al obtener la información del producto:', error);
    res.status(500).json({ message: 'Error al obtener la información del producto' });
  }
};

// Función para crear un nuevo producto (requiere rol de administrador)
export const createProduct = async (req, res) => {
  try {
    // Validar el rol del usuario (administrador)
    if (req.userRole !== 'administrador') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const { nombre, marca, disponibilidad, descuento, precio, imagen, descripcion, categorias } = req.body;

    // Validar que no haya campos vacíos
    if (!nombre || !marca || disponibilidad === undefined || descuento === undefined || !precio || !imagen || !descripcion || !categorias || categorias.length === 0) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Calcular el precioDescuento
    const precioDescuento = precio - (precio * descuento) / 100;

    const nuevoProducto = new Producto({
      nombre,
      marca,
      disponibilidad,
      descuento,
      precio,
      imagen,
      descripcion,
      categorias,
      precioDescuento,
    });

    await nuevoProducto.save();

    res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Función para actualizar un producto (requiere rol de administrador)
export const updateProduct = async (req, res) => {
  try {
    // Validar el rol del usuario (administrador)
    if (req.userRole !== 'administrador') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const { nombre, marca, disponibilidad, descuento, precio, imagen, descripcion, categorias } = req.body;

    // Validar que no haya campos vacíos
    if (!nombre || !marca || disponibilidad === undefined || descuento === undefined || !precio || !imagen || !descripcion || !categorias || categorias.length === 0) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Calcular el precioDescuento
    const precioDescuento = precio - (precio * descuento) / 100;

    const productoActualizado = {
      nombre,
      marca,
      disponibilidad,
      descuento,
      precio,
      imagen,
      descripcion,
      categorias,
      precioDescuento,
    };

    const producto = await Producto.findByIdAndUpdate(req.params.id, productoActualizado, { new: true });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Función para eliminar un producto y cambiar su estado a activo (requiere rol de administrador)
export const deleteProduct = async (req, res) => {
  try {
    // Validar el rol del usuario (administrador)
    if (req.userRole !== 'administrador') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 'activo' }, { new: true });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado y activado exitosamente', producto });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
