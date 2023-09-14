// controllers/bitacoraCompraController.js
import BitacoraCompra from '../models/Bitacoracompra.js';

export const registrarCompraEnBitacora = async (productosVendidos, totalVendido) => {
  try {
    const nuevaEntrada = new BitacoraCompra({
      totalVendido,
      productosVendidos,
    });

    await nuevaEntrada.save();
    console.log('Compra registrada en la bitácora con éxito');
  } catch (error) {
    console.error('Error al registrar compra en la bitácora:', error);
  }
};
