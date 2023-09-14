// models/BitacoraCompra.js
import mongoose from 'mongoose';

const bitacoraCompraSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  totalVendido: { type: Number, required: true },
  productosVendidos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
      precioUnitario: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('BitacoraCompra', bitacoraCompraSchema);
