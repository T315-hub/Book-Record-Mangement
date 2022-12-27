const express= require("express");

// import db connection file 
const DbConnection = require("./databaseConnection");

// import db

const dotenv = require("dotenv");


// const {UserModel,BookModel}=require("./models/index");

// calling the users router
const usersRouter=require("./routes/users");
const booksRouter=require("./routes/books");

// config the data base using dotenv 

dotenv.config();

// create app variable that use all the methods of express package 
const app=express();  // for start the server 

// calling the db file 

DbConnection();   // for database connection 

// port number
const port=8081;
// in express all data transfer is possible only in json format 
app.use(express.json());

// get method 
app.get("/",(req,res)=>
{
    res.status(200).json({
        message:"Server is up and running successfully "
    });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);


// for wrong route
app.get("*",(req,res)=>
{
    res.status(404).json({
        message:"This route does not exist"
    });
});
// to listen the request to the server 
app.listen(port,()=>
{
    console.log(`Node js  server is started on port ${port}`);
});