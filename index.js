const express = require("express");
const ConnectToMongodb = require("./connect/index")
const router = require("./Routes/index")
const path=require("path");
const  {checkforauthentication}= require("./middleware/auth")
const cookieParser = require("cookie-parser");
const PORT = 8000
const app = express();
//Connected to the Db
ConnectToMongodb("mongodb://127.0.0.1:27017/relation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("Connected to the databse"))
    //ejs


 const Role = require('./models/Role');
 const  Permission = require('./models/Permissions');


    app.set('view engine', 'ejs');
    app.set('views',path.resolve("./views"));
//middleWares
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cookieParser())
app.use(checkforauthentication)
app.use(router)
//Routes

app.listen(PORT, () => { console.log("connected to the port" + PORT) })
