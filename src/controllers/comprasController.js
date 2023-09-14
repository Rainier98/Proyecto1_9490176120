// controllers/comprasController.js
import Compra from '../models/compra.js';
import Producto from '../models/productos.js';

// Función para realizar una compra
export const realizarCompra = async (req, res) => {
  try {
    const { usuario, productos } = req.body;

    // Validar que el token corresponda al usuario indicado
    if (req.userId !== usuario) {
      return res.status(403).json({ message: 'Token no corresponde al usuario indicado' });
    }

    // Crear una nueva compra
    const nuevaCompra = new Compra({ usuario, productos });

    // Calcular el total de la compra
    const totalCompra = productos.reduce((total, item) => total + item.cantidad * item.precio, 0);

    // Verificar disponibilidad de productos y descontar del inventario
    for (const item of productos) {
      const producto = await Producto.findById(item.producto);

      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (producto.disponibilidad < item.cantidad) {
        return res.status(400).json({ message: 'No hay suficiente disponibilidad de producto' });
      }

      producto.disponibilidad -= item.cantidad;
      await producto.save();
    }

    // Guardar la compra en la base de datos
    await nuevaCompra.save();

    // Crear una bitácora de compras por usuario
    // Puedes personalizar esta parte según tus necesidades

    res.status(201).json({ message: 'Compra realizada con éxito', total: totalCompra });
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    res.status(500).json({ message: 'Error al realizar la compra' });
  }
};
