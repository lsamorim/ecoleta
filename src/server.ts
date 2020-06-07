import express from 'express'; // npm install @types/express -D (instala as definições de tipo do express, -D apenas para ambiente de desenvolvimento)
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

const uploadsDirectory = path.resolve(__dirname, '..', 'uploads');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(uploadsDirectory));

app.listen(3333);