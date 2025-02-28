const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000

app.use(express.json());
app.use(cors())

app.use('/api/cart',require('./routes/cart'));
app.use('/api/buy' ,require('./routes/buy'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'))
app.use('/api/delivery', require('./routes/delivery'))


app.listen(port, ()=>{
    console.log(`ShopEase is listening at port ${port}`);
})