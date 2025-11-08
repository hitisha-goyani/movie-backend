import express from "express"
import connectDB from "./config/db.js";
import HttpError from "./middleware/errorHandler.js";
import movieRouter from "./routes/movieRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app= express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set("view engine", "ejs")


app.use(express.json());


app.use(express.urlencoded({ extended: true }))

app.use("/movie",movieRouter);

app.use("/",(req,res)=>{
    res.status(200).json("hello from server")
});


app.use((req,res,next)=>{
    next(new HttpError("requested route not found"))
})


app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500)
    .json(error.message||"something went wrong try again")
})
const port = 5000;

const startServer = async()=>{
    try{
        const connect = await connectDB();
        if(!connect){
            throw new Error("failed to connect db")
        }
        console.log("db connected");

        app.listen(port,()=>{
        console.log("server running on port",port)
})
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

startServer();


