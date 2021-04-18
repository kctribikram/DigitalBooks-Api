const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors');
const path = require('path')

const db = require('./database/db')
const Reader = require('./routes/reader');
const bookRoute = require('./routes/bookRoute');
const watchlist = require('./routes/watchlist')
const app = express();
app.use("/pictures", express.static(path.join(__dirname, "pictures")))
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(Reader);
app.use(bookRoute);
app.use(watchlist);

app.listen(3000)