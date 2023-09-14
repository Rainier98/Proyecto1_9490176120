// models/Perfil.js
import mongoose from 'mongoose';

const perfilSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  direccion: { type: String },
  fechaNacimiento: { type: Date },
  numeroTelefonico: { type: String },
});

export default mongoose.model('Perfil', perfilSchema);
