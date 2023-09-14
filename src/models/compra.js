// models/Compra.js
import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
  fechaCompra: { type: Date, default: Date.now },
  total: { type: Number, required: true },
});

export default mongoose.model('Compra', compraSchema);
