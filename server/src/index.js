require('dotenv').config();
const express = require('express')
const mongoDBConnection = require('../config/dbConnection');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// IMPORTING ROUTES
const userRoutes = require('../routes/v1/userRoutes');
const authRoutes = require('../routes/v1/authRoutes');
const postRoutes = require('../routes/v1/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// USING ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);

mongoDBConnection();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening the ${port} PORT`)
});