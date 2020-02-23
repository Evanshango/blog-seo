const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//bring in routes
const blogRoutes = require('./routes/blogRoute');
const authRoutes = require('./routes/authRoute');
const app = express();
//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true
}).then(() => console.log('Database Connected'));

//middle-wares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}
//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
//port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
