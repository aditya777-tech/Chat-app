import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from './DB/ConnectToMongoDb.js';


dotenv.config();

const app = express();

// Parse incoming JSON payloads
app.use(express.json());
app.use(cookieParser());

// Define routes
app.get('/', (req, res) => {
    res.send('backend');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is listening on port ${port}`);
});
