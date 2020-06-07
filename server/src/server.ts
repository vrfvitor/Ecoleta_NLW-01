import path from 'path';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import {errors} from 'celebrate';

const app = express();

app.use(express.json());
app.use(errors());
app.use(cors());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


app.listen(8000);
