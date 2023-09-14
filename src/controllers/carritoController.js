// controllers/carritoController.js
import Carrito from '../models/Carrito.js';
import Producto from '../models/productos.js';

// Función para obtener el carrito de un usuario
export const getCarrito = async (req, res) => {
  try {
    const { usuario } = req.body;
    const carrito = await Carrito.findOne({ usuario }).populate('productos.producto');
    res.status(200).json({ carrito });
  } catch (error) {
    console.error('Error al obtener el carrito de compras:', error);
    res.status(500).json({ message: 'Error al obtener el carrito de compras' });
  }
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { usuario, producto, cantidad } = req.body;
    const carrito = await Carrito.findOne({ usuario });

    // Verificar disponibilidad del producto
    const productoEnCarrito = carrito.productos.find((item) => item.producto._id.equals(producto));
    if (!productoEnCarrito) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    // Verificar disponibilidad del producto en inventario
    const productoDB = await Producto.findById(producto);
    if (productoDB.disponibilidad < cantidad) {
      return res.status(400).json({ message: 'No hay suficiente disponibilidad de producto' });
    }

    // Actualizar la cantidad del producto en el carrito
    productoEnCarrito.cantidad = cantidad;

    // Calcular el nuevo total
    carrito.total = carrito.productos.reduce((total, item) => total + item.cantidad * item.producto.precioDescuento, 0);

    // Guardar el carrito actualizado
    await carrito.save();

    res.status(200).json({ message: 'Cantidad del producto actualizada correctamente', carrito });
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito' });
  }
};

// Función para eliminar un producto del carrito
export const deleteCartItem = async (req, res) => {
  try {
    const { usuario, producto } = req.body;
    const carrito = await Carrito.findOne({ usuario });

    // Encontrar el producto en el carrito
    const index = carrito.productos.findIndex((item) => item.producto._id.equals(producto));

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    // Eliminar el producto del carrito
    carrito.productos.splice(index, 1);

    // Calcular el nuevo total
    carrito.total = carrito.productos.reduce((total, item) => total + item.cantidad * item.producto.precioDescuento, 0);

    // Guardar el carrito actualizado
    await carrito.save();

    res.status(200).json({ message: 'Producto eliminado del carrito correctamente', carrito });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
};
