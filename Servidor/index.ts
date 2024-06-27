import express from "express";
import cors from "cors";
import router from "./src/routes/routes";
import sequelize from "./src/config/database.config";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

    const server = app.listen(port, () => {
      console.clear();
      console.log(`API escuchando en http://localhost:${port}`);
    });

    // Configuración del servidor WebSocket
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
      console.log('Cliente conectado a WebSocket.');

      ws.on('message', (message) => {
        console.log('Mensaje recibido:', message.toString());
      });

      ws.on('close', () => {
        console.log('Cliente desconectado de WebSocket.');
      });

      ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
      });
    });

  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
}

startServer();
