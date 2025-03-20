
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './db.js'; 

import bookRoutes from './routes/bookRoutes.js';

import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';


// Load environment variables
dotenv.config();


// const bookRoutes = require('./routes/book'); //  Import book routes
const app = express();

// Connect to MongoDB
connection();



// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes); //for user
app.use("/api/auth", authRoutes);  // for auth
app.use("/api/books", bookRoutes); // Add book routes




app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
  });
  


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(` Server is running on port ${port}`));
