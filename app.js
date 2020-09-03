const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const productsRoute=require('./api/routes/products');
const orderRoute=require('./api/routes/orders');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://alemin:alemin@stores.msmdj.mongodb.net/stores?retryWrites=true&w=majority');
//mongodb+srv://agrey:Bakata2019@googleauth.i86eg.mongodb.net/GOOGLEAUTH?retryWrites=true&w=majority

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//preventing CORS(cross origin resource sharing) errors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productsRoute);
app.use('/orders', orderRoute);

app.use((req, res, next)=>{
    const error= new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;