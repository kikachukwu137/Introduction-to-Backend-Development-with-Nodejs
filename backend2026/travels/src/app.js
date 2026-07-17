import express from 'express';
import toursRoutes from './routes/tourRoutes.js';
import morgan from 'morgan';
const app = express();
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/tours", toursRoutes);


export default app;
