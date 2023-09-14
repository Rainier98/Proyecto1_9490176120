// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import usuariosRouter from './routes/usuarios.js';
import productosRouter from './routes/productos.js';
import carritosRouter from './routes/carrito.js';

const app = express();
const port = 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://rainialejo1998:RainiMongo@ac-9wbmist-shard-00-00.huj59eu.mongodb.net:27017,ac-9wbmist-shard-00-01.huj59eu.mongodb.net:27017,ac-9wbmist-shard-00-02.huj59eu.mongodb.net:27017/?ssl=true&replicaSet=atlas-1n29bb-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Agregar esta línea para evitar advertencias de deprecación
})
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

app.use(express.json());

// Usar las rutas de usuarios
app.use('/usuarios', usuariosRouter);
//Productos
app.use('/productos', productosRouter);
//Carritos
app.use('/carritos', carritosRouter);

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
