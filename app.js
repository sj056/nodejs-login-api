const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


require('dotenv').config()

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected with the DB");
}).catch(err=>{
    console.log("Cannot connect with the DB",err);
});

mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const routes=require('./src/routes/index');
app.use('/',routes)

app.use((req,res,next)=>{
    const error=new Error("Not Found");
    error.status=404;
    next(error);
});

app.use((req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
module.exports=app;