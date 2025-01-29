const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//db connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('DB Connected');
    
    //routes middleware
    app.use('/api', authRoutes);
    app.use('/', postRoutes);
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
