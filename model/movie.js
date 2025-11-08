import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    genere:{
        type:String,
         required:true
    },
    year:{
        type:Number,
         required:true
    },
    rating:{
         type:Number,
         required:true
    },
    image:{
        type:String,
         
        
    }
})

const Movie = mongoose.model("movie",movieSchema);

export default Movie;