const express = require('express');
const connectDB = require('./config/database');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const countryRouter = require('./routes/countryRouter');
const cityRouter = require('./routes/cityRouter');

const { requireAuth } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cookieParser = require("cookie-parser")
app.use(cookieParser());

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.use('/dashboard', authRouter)
app.use('/dashboard/users', requireAuth, userRouter)
app.use('/dashboard/countries', requireAuth, countryRouter)
app.use('/dashboard/cities', requireAuth, cityRouter)