const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database/mongoose');
const errorHandler = require('./middleware/error/handler');
const routes = require('./routes');
const { port } = require('./config/env');

const app = express();

 app.use(cors({
  origin: 'https://stay-finder-frontend-9pmx.vercel.app/', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
