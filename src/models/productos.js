// models/Producto.js
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: String,
  marca: String,
  disponibilidad: Boolean,
  descuento: Number,
  precioDescuento: Number,
  imagen: String,
  descripcion: String,
  categoria: String,
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // Referencia al usuario propietario
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
