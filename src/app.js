// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import usuariosRouter from './routes/usuarios.js';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';
import comprasRouter from './routes/compras.js';
import perfilesRouter from './routes/perfiles.js'; // Agrega esta línea
import connectDB from './db.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
app.use('/compras', comprasRouter);
app.use('/perfiles', perfilesRouter); // Agrega esta línea

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
