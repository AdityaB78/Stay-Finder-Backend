const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database/mongoose');
const errorHandler = require('./middleware/error/handler');
const routes = require('./routes');
const { port } = require('./config/env');

const app = express();

// ✅ Enhanced CORS config
const corsOptions = {
  origin: ['http://localhost:5173', 'https://stay-finder-frontend-9pmx.vercel.app'], // add your actual frontend deployed URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', routes);

// Your error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
